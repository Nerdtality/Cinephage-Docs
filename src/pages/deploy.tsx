import type { ReactNode } from 'react';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useSmoothScrollTo } from '@docusaurus/theme-common/internal';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { generateStackOutput } from '@site/src/components/compose/generateDockerCompose';
import { canProceedFromStep, validationErrorForStep } from '@site/src/components/compose/validateStackState';
import {
	computeJellyfinPublishedServerUrl,
	computeOrigin,
	defaultStackState,
	gspEnvRequested,
	type HostOs,
	type StackConfiguratorState,
	type TorrentChoice
} from '@site/src/components/compose/types';
import { generateBetterAuthSecret, generateGspGtnApiKey } from '@site/src/utils/secrets';
import { IntroSplash, dismissIntro } from '@site/src/components/docker-configurator/IntroSplash';
import { phaseTransition } from '@site/src/components/docker-configurator/ChoiceCards';
import { WizardProgress } from '@site/src/components/docker-configurator/WizardProgress';
import { WelcomePhase } from '@site/src/components/docker-configurator/phases/WelcomePhase';
import { StorageTimePhase } from '@site/src/components/docker-configurator/phases/StorageTimePhase';
import { NetworkPhase } from '@site/src/components/docker-configurator/phases/NetworkPhase';
import { ApplicationsPhase } from '@site/src/components/docker-configurator/phases/ApplicationsPhase';
import { VpnPhase } from '@site/src/components/docker-configurator/phases/VpnPhase';
import { ReviewPhase } from '@site/src/components/docker-configurator/phases/ReviewPhase';
import styles from '@site/src/components/docker-configurator/docker-configurator.module.css';

const INTRO_KEY = 'cinephage-stack-builder-intro';

const PHASE_TITLES = [
	'Welcome',
	'System',
	'Network',
	'Applications',
	'VPN',
	'Review'
] as const;
const PHASE_COUNT = PHASE_TITLES.length;

const phaseVariants = {
	initial: (d: number) => ({
		opacity: 0,
		y: d >= 0 ? 18 : -18
	}),
	animate: {
		opacity: 1,
		y: 0,
		transition: phaseTransition(false)
	},
	exit: (d: number) => ({
		opacity: 0,
		y: d >= 0 ? -14 : 14,
		transition: phaseTransition(false)
	})
};

export default function DeployPage(): ReactNode {
	const [s, setS] = useState<StackConfiguratorState>(defaultStackState);
	const [step, setStep] = useState(0);
	const [navDirection, setNavDirection] = useState(1);
	const [introOpen, setIntroOpen] = useState(false);
	const skipStepScrollRef = useRef(true);
	const smoothScrollRef = useRef({ cancel: () => {}, start: (_top: number) => {} });
	const { startScroll, cancelScroll } = useSmoothScrollTo();
	smoothScrollRef.current = { cancel: cancelScroll, start: startScroll };
	const reduceMotion = useReducedMotion() ?? false;

	useEffect(() => {
		if (typeof sessionStorage === 'undefined') return;
		if (sessionStorage.getItem(INTRO_KEY) !== '1') setIntroOpen(true);
	}, []);

	useLayoutEffect(() => {
		setS((prev) => {
			const patch: Partial<StackConfiguratorState> = {};
			if (!prev.betterAuthSecret.trim()) {
				patch.betterAuthSecret = generateBetterAuthSecret();
			}
			if (gspEnvRequested(prev) && !prev.gspGtnApiKey.trim()) {
				patch.gspGtnApiKey = generateGspGtnApiKey();
			}
			if (Object.keys(patch).length === 0) return prev;
			return { ...prev, ...patch };
		});
	}, [s.torrentChoice, s.vpnPreset, s.useGspPortSync]);

	const out = useMemo(() => generateStackOutput(s), [s]);

	const setField = useCallback(<K extends keyof StackConfiguratorState>(key: K, value: StackConfiguratorState[K]) => {
		setS((prev) => ({ ...prev, [key]: value }));
	}, []);

	const setCustomVpn = useCallback((patch: Partial<StackConfiguratorState['customVpn']>) => {
		setS((prev) => ({ ...prev, customVpn: { ...prev.customVpn, ...patch } }));
	}, []);

	const setProtonVpn = useCallback((patch: Partial<StackConfiguratorState['protonVpn']>) => {
		setS((prev) => ({ ...prev, protonVpn: { ...prev.protonVpn, ...patch } }));
	}, []);

	const setMullvadVpn = useCallback((patch: Partial<StackConfiguratorState['mullvadVpn']>) => {
		setS((prev) => ({ ...prev, mullvadVpn: { ...prev.mullvadVpn, ...patch } }));
	}, []);

	const setHostOs = useCallback((v: HostOs) => setField('hostOs', v), [setField]);

	const previewOrigin = useMemo(() => computeOrigin(s), [s]);
	const jellyfinPublishedPreview = useMemo(() => computeJellyfinPublishedServerUrl(s), [s]);

	const goNext = useCallback(() => {
		setNavDirection(1);
		setStep((x) => Math.min(x + 1, PHASE_COUNT - 1));
	}, []);

	const goBack = useCallback(() => {
		setNavDirection(-1);
		setStep((x) => Math.max(x - 1, 0));
	}, []);

	const onTorrentPick = useCallback((v: TorrentChoice) => {
		setS((prev) => ({
			...prev,
			torrentChoice: v,
			vpnPreset: v === 'none' ? 'none' : prev.vpnPreset
		}));
	}, []);

	const canGoNext = useMemo(() => canProceedFromStep(step, s), [step, s]);

	const stepValidationError = useMemo(() => validationErrorForStep(step, s), [step, s]);

	const lastStep = step === PHASE_COUNT - 1;

	useEffect(() => {
		if (skipStepScrollRef.current) {
			skipStepScrollRef.current = false;
			return;
		}
		const { cancel, start } = smoothScrollRef.current;
		cancel();
		if (reduceMotion) {
			window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
		} else {
			start(0);
		}
	}, [step, reduceMotion]);

	const closeIntro = useCallback(() => {
		dismissIntro();
		setIntroOpen(false);
	}, []);

	return (
		<Layout
			title="Deploy (Beta)"
			description="Generate a Docker Compose stack for Cinephage and optional services. This tool is in beta. Review generated files before production use."
		>
			<AnimatePresence>
				{introOpen ?
					<IntroSplash key="intro-splash" onClose={closeIntro} />
				:	null}
			</AnimatePresence>
			<div className={clsx('container margin-top--none margin-bottom--lg', styles.configuratorPage)}>
				<div className={clsx('alert alert--warning margin-bottom--md', styles.deployBetaAlert)} role="status">
					<strong>Deploy is in beta.</strong> Generated compose and <code>.env</code> are a starting point. Review
					and adapt them for your host before relying on them in production.
				</div>
				<div className={styles.configuratorMain}>
					{!lastStep && (
						<div className={styles.wizardCard}>
							<AnimatePresence mode="wait" initial={false} custom={navDirection}>
								<motion.div
									key={step}
									custom={navDirection}
									variants={phaseVariants}
									initial="initial"
									animate="animate"
									exit="exit"
									className={styles.phasePane}
								>
									{step === 0 && (
										<WelcomePhase hostOs={s.hostOs} setHostOs={setHostOs} reduceMotion={reduceMotion} />
									)}
									{step === 1 && (
										<StorageTimePhase
											s={s}
											setField={setField}
											onRegenerateSecret={() => setField('betterAuthSecret', generateBetterAuthSecret())}
										/>
									)}
									{step === 2 && (
										<NetworkPhase
											s={s}
											previewOrigin={previewOrigin}
											setField={setField}
											reduceMotion={reduceMotion}
										/>
									)}
									{step === 3 && (
										<ApplicationsPhase
											s={s}
											setS={setS}
											setField={setField}
											onTorrentPick={onTorrentPick}
											jellyfinPublishedPreview={jellyfinPublishedPreview}
											reduceMotion={reduceMotion}
										/>
									)}
									{step === 4 && (
										<VpnPhase
											s={s}
											setField={setField}
											setCustomVpn={setCustomVpn}
											setProtonVpn={setProtonVpn}
											setMullvadVpn={setMullvadVpn}
											onRegenerateGspKey={() => setField('gspGtnApiKey', generateGspGtnApiKey())}
											reduceMotion={reduceMotion}
										/>
									)}
								</motion.div>
							</AnimatePresence>

							{stepValidationError ?
								<p className={styles.validationError} role="status">
									{stepValidationError}
								</p>
							:	null}

							<div className={styles.navRow}>
								<button
									type="button"
									className="button button--secondary"
									disabled={step === 0}
									onClick={goBack}
								>
									Back
								</button>
								<div className={styles.navRowProgress}>
									<WizardProgress
										step={step}
										phaseCount={PHASE_COUNT}
										labels={PHASE_TITLES}
										reduceMotion={reduceMotion}
										variant="inline"
									/>
								</div>
								<button
									type="button"
									className="button button--primary"
									disabled={!canGoNext}
									onClick={goNext}
								>
									Next
								</button>
							</div>
						</div>
					)}

					{lastStep && (
						<motion.div
							initial={reduceMotion ? false : { opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={reduceMotion ? { duration: 0 } : { duration: 0.38 }}
						>
							<ReviewPhase
								out={out}
								onBack={goBack}
								footerProgress={
									<div className={styles.navRowProgress}>
										<WizardProgress
											step={step}
											phaseCount={PHASE_COUNT}
											labels={PHASE_TITLES}
											reduceMotion={reduceMotion}
											variant="inline"
										/>
									</div>
								}
							/>
						</motion.div>
					)}
				</div>
			</div>
		</Layout>
	);
}
