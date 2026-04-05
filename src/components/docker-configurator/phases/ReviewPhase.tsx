import type { ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import clsx from 'clsx';
import type { GeneratedStackOutput } from '@site/src/components/compose/types';
import styles from '@site/src/components/docker-configurator/docker-configurator.module.css';

const COPY_FEEDBACK_MS = 1500;

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
	const [copiedId, setCopiedId] = useState<string | null>(null);
	const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const copyBlock = useCallback(async (id: string, text: string) => {
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			/* ignore */
		}
		if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
		setCopiedId(id);
		copyTimerRef.current = setTimeout(() => {
			setCopiedId(null);
			copyTimerRef.current = null;
		}, COPY_FEEDBACK_MS);
	}, []);

	useEffect(
		() => () => {
			if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
		},
		[]
	);

	const copyLabel = (id: string) => (copiedId === id ? 'Copied' : 'Copy');

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
			</div>

			<div className={styles.downloadRow}>
				<button type="button" className="button button--primary button--sm" onClick={onDownloadAll}>
					Download all files
				</button>
				<span className={styles.fieldHint} style={{ margin: 0 }}>
					Saves compose, proxy snippets, and .env (your browser may ask to allow multiple downloads).
				</span>
			</div>

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
				<div className={styles.outputHeader}>
					<h2 style={{ margin: 0 }}>.env</h2>
					<button
						type="button"
						className={clsx('button button--secondary button--sm', styles.copyBtn)}
						onClick={() => copyBlock('env', props.out.dotEnv)}
					>
						{copyLabel('env')}
					</button>
				</div>
				<CodeBlock language="bash">{props.out.dotEnv}</CodeBlock>
			</div>

			<div className={clsx(styles.panel, styles.subBlock)}>
				<div className={styles.outputHeader}>
					<h2 style={{ margin: 0 }}>docker-compose.yml</h2>
					<button
						type="button"
						className={clsx('button button--secondary button--sm', styles.copyBtn)}
						onClick={() => copyBlock('compose', props.out.composeYaml)}
					>
						{copyLabel('compose')}
					</button>
				</div>
				<CodeBlock language="yaml">{props.out.composeYaml}</CodeBlock>
			</div>

			{props.out.caddyfile && (
				<div className={clsx(styles.panel, styles.subBlock)}>
					<div className={styles.outputHeader}>
						<h3>Caddyfile</h3>
						<button
							type="button"
							className={clsx('button button--secondary button--sm', styles.copyBtn)}
							onClick={() => copyBlock('caddy', props.out.caddyfile!)}
						>
							{copyLabel('caddy')}
						</button>
					</div>
					<CodeBlock language="bash">{props.out.caddyfile}</CodeBlock>
				</div>
			)}

			{props.out.nginxConf && (
				<div className={clsx(styles.panel, styles.subBlock)}>
					<div className={styles.outputHeader}>
						<h3>nginx/default.conf</h3>
						<button
							type="button"
							className={clsx('button button--secondary button--sm', styles.copyBtn)}
							onClick={() => copyBlock('nginx', props.out.nginxConf!)}
						>
							{copyLabel('nginx')}
						</button>
					</div>
					<CodeBlock language="nginx">{props.out.nginxConf}</CodeBlock>
				</div>
			)}

			{props.out.traefikDynamicYaml && (
				<div className={clsx(styles.panel, styles.subBlock)}>
					<div className={styles.outputHeader}>
						<h3>traefik/dynamic.yml</h3>
						<button
							type="button"
							className={clsx('button button--secondary button--sm', styles.copyBtn)}
							onClick={() => copyBlock('traefik', props.out.traefikDynamicYaml!)}
						>
							{copyLabel('traefik')}
						</button>
					</div>
					<CodeBlock language="yaml">{props.out.traefikDynamicYaml}</CodeBlock>
				</div>
			)}

			<p className={styles.disclaimer}>
				Homelab example only. For Gluetun, see{' '}
				<a href="https://github.com/qmcgaw/gluetun-wiki" target="_blank" rel="noreferrer noopener">
					gluetun-wiki
				</a>
				. Altmount may need extra capabilities per upstream docs.
			</p>
		</div>
	);
}
