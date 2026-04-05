import type { ReactNode } from 'react';
import clsx from 'clsx';
import { motion, useReducedMotion } from 'framer-motion';
import { AppIcon, type AppIconSlug } from '@site/src/components/compose/StackAppIcons';
import styles from '@site/src/components/docker-configurator/docker-configurator.module.css';

export const phaseTransition = (reduce: boolean) =>
	reduce ?
		{ duration: 0 }
	:	{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const };

export function ChoiceCard(props: {
	selected: boolean;
	onClick: () => void;
	title: string;
	description?: string;
	iconSlug?: AppIconSlug;
	iconLabel?: string;
	reduceMotion: boolean;
}): ReactNode {
	const icon = (
		<AppIcon slug={props.iconSlug} label={props.iconLabel ?? props.title} />
	);
	const inner = (
		<>
			<span className={styles.choiceCardIconWrap}>{icon}</span>
			<span className={styles.choiceCardTitle}>{props.title}</span>
			{props.description ? <span className={styles.choiceCardDesc}>{props.description}</span> : null}
		</>
	);
	if (props.reduceMotion) {
		return (
			<button
				type="button"
				className={clsx(styles.choiceCard, props.selected && styles.choiceCardSelected)}
				aria-pressed={props.selected}
				onClick={props.onClick}
			>
				{inner}
			</button>
		);
	}
	return (
		<motion.button
			type="button"
			className={clsx(styles.choiceCard, props.selected && styles.choiceCardSelected)}
			aria-pressed={props.selected}
			onClick={props.onClick}
			whileHover={{ y: -2, transition: { duration: 0.18 } }}
			whileTap={{ scale: 0.98 }}
		>
			{inner}
		</motion.button>
	);
}

export function ChoiceGrid(props: { children: ReactNode }): ReactNode {
	return <div className={styles.choiceGrid}>{props.children}</div>;
}

export function StaggerChoice(props: {
	index: number;
	reduceMotion: boolean;
	children: ReactNode;
}): ReactNode {
	if (props.reduceMotion) {
		return <>{props.children}</>;
	}
	return (
		<motion.div
			className={styles.choiceStaggerItem}
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.24, delay: props.index * 0.045 }}
		>
			{props.children}
		</motion.div>
	);
}

/** For components that need reduceMotion without threading from parent. */
export function useConfiguratorReducedMotion(): boolean {
	return useReducedMotion() ?? false;
}
