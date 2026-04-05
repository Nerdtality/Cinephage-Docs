import type { ReactNode } from 'react';
import clsx from 'clsx';
import type { StackConfiguratorState } from '@site/src/components/compose/types';
import {
	ChoiceCard,
	ChoiceGrid,
	StaggerChoice
} from '@site/src/components/docker-configurator/ChoiceCards';
import type { AppIconSlug } from '@site/src/components/compose/StackAppIcons';
import styles from '@site/src/components/docker-configurator/docker-configurator.module.css';

export function NetworkPhase(props: {
	s: StackConfiguratorState;
	previewOrigin: string;
	setField: <K extends keyof StackConfiguratorState>(key: K, value: StackConfiguratorState[K]) => void;
	reduceMotion: boolean;
}): ReactNode {
	const proxyChoices: {
		sel: boolean;
		onClick: () => void;
		title: string;
		desc?: string;
		iconSlug?: AppIconSlug;
		iconLabel?: string;
	}[] = [
		{
			sel: props.s.proxyMode === 'direct',
			onClick: () => props.setField('proxyMode', 'direct'),
			title: 'Direct',
			desc: 'Publish ports on the host.',
			iconLabel: 'Direct'
		},
		{
			sel: props.s.proxyMode === 'caddy',
			onClick: () => props.setField('proxyMode', 'caddy'),
			title: 'Caddy',
			desc: 'Generates a Caddyfile.',
			iconSlug: 'caddy'
		},
		{
			sel: props.s.proxyMode === 'nginx',
			onClick: () => props.setField('proxyMode', 'nginx'),
			title: 'Nginx',
			desc: 'Generates nginx/default.conf.',
			iconSlug: 'nginx'
		},
		{
			sel: props.s.proxyMode === 'traefik',
			onClick: () => props.setField('proxyMode', 'traefik'),
			title: 'Traefik',
			desc: 'Generates traefik/dynamic.yml.',
			iconSlug: 'docker'
		}
	];

	return (
		<>
			<h2 className={styles.stepHeading}>Network</h2>
			<p className={styles.fieldHint}>How you reach Cinephage in the browser determines <code>ORIGIN</code>.</p>

			<h3 className={styles.subsectionHeading}>Reverse proxy</h3>
			<ChoiceGrid>
				{proxyChoices.map((c, i) => (
					<StaggerChoice key={c.title} index={i} reduceMotion={props.reduceMotion}>
						<ChoiceCard
							reduceMotion={props.reduceMotion}
							selected={c.sel}
							onClick={c.onClick}
							title={c.title}
							description={c.desc}
							iconSlug={c.iconSlug}
							iconLabel={c.iconLabel}
						/>
					</StaggerChoice>
				))}
			</ChoiceGrid>

			{props.s.proxyMode === 'direct' && (
				<>
					<div className={clsx(styles.fieldRow, 'margin-top--md')}>
						<label className={styles.fieldRowLabel} htmlFor="directOrigin">
							Cinephage ORIGIN (direct URL)
						</label>
						<div className={styles.fieldRowControl}>
							<input
								id="directOrigin"
								type="text"
								value={props.s.directOrigin}
								onChange={(e) => props.setField('directOrigin', e.target.value)}
								placeholder="http://localhost:3000"
							/>
						</div>
					</div>
					<p className={styles.fieldHint}>
						Default published host ports are in the generated compose. Edit the YAML to change bindings.
					</p>
				</>
			)}

			{props.s.proxyMode !== 'direct' && (
				<>
					<div className={clsx(styles.fieldRow, 'margin-top--md')}>
						<span className={styles.fieldRowLabel} id="scheme-label">
							Public URL scheme
						</span>
						<div className={styles.fieldRowControl}>
							<div className={styles.schemeRow} role="group" aria-labelledby="scheme-label">
								<button
									type="button"
									className={clsx(
										styles.schemeBtn,
										props.s.publicScheme === 'https' && styles.schemeBtnActive
									)}
									aria-pressed={props.s.publicScheme === 'https'}
									onClick={() => props.setField('publicScheme', 'https')}
								>
									HTTPS
								</button>
								<button
									type="button"
									className={clsx(
										styles.schemeBtn,
										props.s.publicScheme === 'http' && styles.schemeBtnActive
									)}
									aria-pressed={props.s.publicScheme === 'http'}
									onClick={() => props.setField('publicScheme', 'http')}
								>
									HTTP
								</button>
							</div>
						</div>
					</div>
					<div className={styles.fieldRow}>
						<label className={styles.fieldRowLabel} htmlFor="apex">
							Domain
						</label>
						<div className={styles.fieldRowControl}>
							<input
								id="apex"
								type="text"
								value={props.s.apexDomain}
								onChange={(e) => props.setField('apexDomain', e.target.value)}
								placeholder="example.com"
								autoComplete="off"
							/>
							<div className={styles.apexPreview} role="status" aria-live="polite">
								<span className={styles.apexPreviewTitle}>Cinephage URL</span>
								<code className={styles.apexPreviewUrl}>{props.previewOrigin}</code>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
