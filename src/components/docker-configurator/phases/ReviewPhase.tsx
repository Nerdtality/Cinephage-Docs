import type { ReactNode } from 'react';
import CodeBlock from '@theme/CodeBlock';
import type { GeneratedStackOutput } from '@site/src/components/compose/types';
import styles from '@site/src/components/docker-configurator/docker-configurator.module.css';

function triggerDownload(filename: string, content: string, mime: string): void {
	const blob = new Blob([content], { type: mime });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	a.rel = 'noopener';
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}

async function downloadGeneratedFiles(out: GeneratedStackOutput): Promise<void> {
	const items: { name: string; body: string; mime: string }[] = [
		{ name: 'docker-compose.yml', body: out.composeYaml, mime: 'application/yaml' }
	];
	if (out.caddyfile) items.push({ name: 'Caddyfile', body: out.caddyfile, mime: 'text/plain' });
	if (out.nginxConf) items.push({ name: 'nginx-default.conf', body: out.nginxConf, mime: 'text/plain' });
	if (out.traefikDynamicYaml) {
		items.push({
			name: 'traefik-dynamic.yml',
			body: out.traefikDynamicYaml,
			mime: 'application/yaml'
		});
	}
	items.push({ name: '.env', body: out.dotEnv, mime: 'text/plain' });

	for (let i = 0; i < items.length; i++) {
		const it = items[i]!;
		triggerDownload(it.name, it.body, it.mime);
		if (i < items.length - 1) {
			await new Promise((r) => setTimeout(r, 200));
		}
	}
}

export function ReviewPhase(props: {
	out: GeneratedStackOutput;
	onBack: () => void;
	footerProgress?: ReactNode;
}): ReactNode {
	const onDownloadAll = () => {
		void downloadGeneratedFiles(props.out);
	};

	return (
		<div className={styles.reviewSection}>
			<div className={styles.navRow}>
				<button type="button" className="button button--secondary" onClick={props.onBack}>
					Back
				</button>
				{props.footerProgress}
				<button type="button" className="button button--primary" onClick={onDownloadAll}>
					Download all files
				</button>
			</div>
			<p className={styles.reviewDownloadHint}>
				Saves compose, proxy snippets, and <code>.env</code> (your browser may ask to allow multiple downloads).
			</p>

			{props.out.warnings.length > 0 && (
				<div className={styles.warnings}>
					<strong>Notes</strong>
					<ul>
						{props.out.warnings.map((w) => (
							<li key={w}>{w}</li>
						))}
					</ul>
				</div>
			)}

			<div className={styles.panel}>
				<section className={styles.reviewCodeBlock} aria-label="Generated .env file">
					<CodeBlock language="properties">{props.out.dotEnv}</CodeBlock>
				</section>
			</div>

			<div className={styles.panel}>
				<section className={styles.reviewCodeBlock} aria-label="Generated docker-compose.yml">
					<CodeBlock language="yaml">{props.out.composeYaml}</CodeBlock>
				</section>
			</div>

			{props.out.caddyfile && (
				<div className={styles.panel}>
					<section className={styles.reviewCodeBlock} aria-label="Generated Caddyfile">
						<CodeBlock language="nginx">{props.out.caddyfile}</CodeBlock>
					</section>
				</div>
			)}

			{props.out.nginxConf && (
				<div className={styles.panel}>
					<section className={styles.reviewCodeBlock} aria-label="Generated nginx configuration">
						<CodeBlock language="nginx">{props.out.nginxConf}</CodeBlock>
					</section>
				</div>
			)}

			{props.out.traefikDynamicYaml && (
				<div className={styles.panel}>
					<section className={styles.reviewCodeBlock} aria-label="Generated Traefik dynamic configuration">
						<CodeBlock language="yaml">{props.out.traefikDynamicYaml}</CodeBlock>
					</section>
				</div>
			)}
		</div>
	);
}
