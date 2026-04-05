import type { ReactNode } from 'react';
import { useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/components/docker-configurator/docker-configurator.module.css';

const STORAGE_KEY = 'cinephage-stack-builder-intro';

export function dismissIntro(): void {
	if (typeof sessionStorage !== 'undefined') {
		sessionStorage.setItem(STORAGE_KEY, '1');
	}
}

export function IntroSplash(props: { onClose: () => void }): ReactNode {
	const reduceMotion = useReducedMotion() ?? false;
	const logoUrl = useBaseUrl('/img/logo.png');

	const close = useCallback(() => {
		dismissIntro();
		props.onClose();
	}, [props.onClose]);

	return (
		<motion.div
			className={styles.introOverlay}
			role="dialog"
			aria-modal="true"
			aria-labelledby="intro-splash-title"
			initial={reduceMotion ? false : { opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={reduceMotion ? undefined : { opacity: 0 }}
			transition={reduceMotion ? { duration: 0 } : { duration: 0.35 }}
		>
			<motion.div
				className={styles.introCard}
				initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 8 }}
				transition={
					reduceMotion ?
						{ duration: 0 }
					:	{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }
				}
			>
				<img className={styles.introLogo} src={logoUrl} alt="" width={88} height={88} />
				<h2 id="intro-splash-title" className={styles.introTitle}>
					<span className={styles.introTitleRow}>
						<span className={styles.introTitleText}>Cinephage deploy</span>
						<span className="badge badge--secondary">Beta</span>
					</span>
				</h2>
				<p className={styles.introTagline}>
					A guided few steps to a docker-compose you can copy. No Docker expertise required. You can skip this
					anytime.
				</p>
				<div className={styles.introActions}>
					<button type="button" className="button button--primary button--lg" onClick={close}>
						Get started
					</button>
					<button type="button" className="button button--secondary" onClick={close}>
						Skip
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
}
