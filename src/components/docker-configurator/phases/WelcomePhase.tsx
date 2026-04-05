import type { ReactNode } from 'react';
import type { HostOs } from '@site/src/components/compose/types';
import {
	ChoiceCard,
	ChoiceGrid,
	StaggerChoice
} from '@site/src/components/docker-configurator/ChoiceCards';
import styles from '@site/src/components/docker-configurator/docker-configurator.module.css';

const OS_OPTIONS: { id: HostOs; title: string; description: string; iconLabel: string }[] = [
	{ id: 'windows', title: 'Windows', description: 'Path hints use drive letters.', iconLabel: 'Win' },
	{ id: 'mac', title: 'macOS', description: 'Typical home-folder style paths.', iconLabel: 'Mac' },
	{ id: 'linux', title: 'Linux', description: 'Common POSIX paths.', iconLabel: 'Linux' },
	{ id: 'nas', title: 'NAS / appliance', description: 'Synology-style volume paths.', iconLabel: 'NAS' }
];

export function WelcomePhase(props: {
	hostOs: HostOs;
	setHostOs: (v: HostOs) => void;
	reduceMotion: boolean;
}): ReactNode {
	return (
		<>
			<h2 className={styles.stepHeading}>Welcome</h2>
			<p className={styles.fieldHint}>
				This wizard builds a sample <code>docker-compose</code> for Cinephage and optional apps. Pick where Docker
				runs. We only use this to show friendlier path examples on the next step (nothing secret is sent anywhere).
			</p>
			<h3 className={styles.subsectionHeading}>Where does Docker run?</h3>
			<ChoiceGrid>
				{OS_OPTIONS.map((c, i) => (
					<StaggerChoice key={c.id} index={i} reduceMotion={props.reduceMotion}>
						<ChoiceCard
							reduceMotion={props.reduceMotion}
							selected={props.hostOs === c.id}
							onClick={() => props.setHostOs(c.id)}
							title={c.title}
							description={c.description}
							iconLabel={c.iconLabel}
						/>
					</StaggerChoice>
				))}
			</ChoiceGrid>
		</>
	);
}
