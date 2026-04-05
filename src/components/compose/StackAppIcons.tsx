import type { ReactNode } from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import styles from './StackAppIcons.module.css';

/** Keys match choice cards; values are filenames in selfhst/icons `svg/` (see https://selfh.st/icons/). */
export type AppIconSlug =
	| 'jellyfin'
	| 'plex'
	| 'emby'
	| 'caddy'
	| 'nginx'
	| 'qbittorrent'
	| 'transmission'
	| 'deluge'
	| 'protonvpn'
	| 'docker'
	| 'sabnzbd'
	| 'nzbget'
	| 'aria2'
	| 'postgresql'
	| 'redis'
	| 'bittorrent'
	| 'nzbdav'
	| 'altmount'
	| 'customvpn';

const SELFH_ICON_BASE = 'https://cdn.jsdelivr.net/gh/selfhst/icons@main/svg/';

/** Explicit filenames where they differ from the slug (e.g. kebab-case). */
const SELFH_ICON_FILE: Record<AppIconSlug, string> = {
	jellyfin: 'jellyfin.svg',
	plex: 'plex.svg',
	emby: 'emby.svg',
	caddy: 'caddy.svg',
	nginx: 'nginx.svg',
	qbittorrent: 'qbittorrent.svg',
	transmission: 'transmission.svg',
	deluge: 'deluge.svg',
	protonvpn: 'proton-vpn.svg',
	docker: 'docker.svg',
	sabnzbd: 'sabnzbd.svg',
	nzbget: 'nzbget.svg',
	aria2: 'aria2.svg',
	postgresql: 'postgresql.svg',
	redis: 'redis.svg',
	/** Bitmagnet: no dedicated asset; indexer-style stand-in */
	bittorrent: 'prowlarr.svg',
	/** WebDAV-style; closest match in selfhst/icons */
	nzbdav: 'nextcloud.svg',
	/** Mount / sync style */
	altmount: 'rclone.svg',
	/** Custom OpenVPN / WireGuard in Gluetun */
	customvpn: 'openvpn.svg'
};

export function AppIcon(props: { slug?: AppIconSlug; label: string; className?: string }): ReactNode {
	const [failed, setFailed] = useState(false);

	if (!props.slug || failed) {
		return (
			<span className={clsx(styles.fallback, props.className)} aria-hidden>
				{props.label.slice(0, 1).toUpperCase()}
			</span>
		);
	}

	const src = `${SELFH_ICON_BASE}${SELFH_ICON_FILE[props.slug]}`;

	return (
		<span className={clsx(styles.iconWell, props.className)}>
			<img
				className={styles.icon}
				src={src}
				alt=""
				width={28}
				height={28}
				loading="lazy"
				decoding="async"
				onError={() => setFailed(true)}
			/>
		</span>
	);
}
