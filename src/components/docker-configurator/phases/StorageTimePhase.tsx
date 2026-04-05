import type { ReactNode } from 'react';
import type { StackConfiguratorState } from '@site/src/components/compose/types';
import { TimezoneField } from '@site/src/components/docker-configurator/TimezoneField';
import styles from '@site/src/components/docker-configurator/docker-configurator.module.css';

export function StorageTimePhase(props: {
	s: StackConfiguratorState;
	setField: <K extends keyof StackConfiguratorState>(key: K, value: StackConfiguratorState[K]) => void;
	onRegenerateSecret: () => void;
}): ReactNode {
	return (
		<>
			<h2 className={styles.stepHeading}>System</h2>

			<TimezoneField id="tz" value={props.s.tz} onChange={(tz) => props.setField('tz', tz)} />

			<div className={styles.fieldRow}>
				<label className={styles.fieldRowLabel} htmlFor="pathConfig">
					Host path → /config
				</label>
				<div className={styles.fieldRowControl}>
					<input
						id="pathConfig"
						type="text"
						value={props.s.pathConfig}
						onChange={(e) => props.setField('pathConfig', e.target.value)}
					/>
				</div>
			</div>
			<div className={styles.fieldRow}>
				<label className={styles.fieldRowLabel} htmlFor="pathMedia">
					Host path → /media
				</label>
				<div className={styles.fieldRowControl}>
					<input
						id="pathMedia"
						type="text"
						value={props.s.pathMedia}
						onChange={(e) => props.setField('pathMedia', e.target.value)}
					/>
				</div>
			</div>
			<div className={styles.fieldRow}>
				<label className={styles.fieldRowLabel} htmlFor="pathDownloads">
					Host path → /downloads
				</label>
				<div className={styles.fieldRowControl}>
					<input
						id="pathDownloads"
						type="text"
						value={props.s.pathDownloads}
						onChange={(e) => props.setField('pathDownloads', e.target.value)}
					/>
				</div>
			</div>

			<div className={styles.fieldRow}>
				<label className={styles.fieldRowLabel} htmlFor="betterAuthSecret">
					Better Auth Secret
				</label>
				<div className={styles.fieldRowControl}>
					<div className={styles.row2}>
						<input
							id="betterAuthSecret"
							type="text"
							autoComplete="off"
							readOnly
							value={props.s.betterAuthSecret}
							spellCheck={false}
						/>
						<button type="button" className="button button--secondary" onClick={props.onRegenerateSecret}>
							Regenerate
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
