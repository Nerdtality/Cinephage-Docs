import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from '@site/src/components/docker-configurator/docker-configurator.module.css';

/**
 * Linear progress for the stack builder wizard (step index 0-based).
 */
export function WizardProgress(props: {
	step: number;
	phaseCount: number;
	labels: readonly string[];
	reduceMotion: boolean;
	variant?: 'default' | 'inline';
}): ReactNode {
	const { step, phaseCount, labels, reduceMotion, variant = 'default' } = props;
	const current = step + 1;
	const title = labels[step] ?? '';
	const pct = (current / phaseCount) * 100;
	const inline = variant === 'inline';

	return (
		<div className={clsx(styles.wizardProgressWrap, inline && styles.wizardProgressWrapInline)}>
			<div className={clsx(styles.wizardProgressMeta, inline && styles.wizardProgressMetaInline)}>
				<span className={clsx(styles.wizardProgressTitle, inline && styles.wizardProgressTitleInline)}>
					{title}
				</span>
				<span
					className={clsx(styles.wizardProgressFraction, inline && styles.wizardProgressFractionInline)}
					aria-hidden
				>
					{current} / {phaseCount}
				</span>
			</div>
			<div
				className={styles.wizardProgressTrack}
				role="progressbar"
				aria-valuenow={current}
				aria-valuemin={1}
				aria-valuemax={phaseCount}
				aria-label={`Step ${current} of ${phaseCount}: ${title}`}
			>
				<div
					className={clsx(styles.wizardProgressFill, !reduceMotion && styles.wizardProgressFillMotion)}
					style={{ width: `${pct}%` }}
				/>
			</div>
		</div>
	);
}

