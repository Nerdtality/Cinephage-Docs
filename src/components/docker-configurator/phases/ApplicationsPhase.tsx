import type { Dispatch, ReactNode, SetStateAction } from 'react';
import clsx from 'clsx';
import type { JellyfinHwAccel, StackConfiguratorState, TorrentChoice } from '@site/src/components/compose/types';
import {
	ChoiceCard,
	ChoiceGrid,
	StaggerChoice
} from '@site/src/components/docker-configurator/ChoiceCards';
import styles from '@site/src/components/docker-configurator/docker-configurator.module.css';

export function ApplicationsPhase(props: {
	s: StackConfiguratorState;
	setS: Dispatch<SetStateAction<StackConfiguratorState>>;
	setField: <K extends keyof StackConfiguratorState>(key: K, value: StackConfiguratorState[K]) => void;
	onTorrentPick: (v: TorrentChoice) => void;
	jellyfinPublishedPreview: string;
	reduceMotion: boolean;
}): ReactNode {
	return (
		<>
			<h2 className={styles.stepHeading}>Applications</h2>
			<p className={styles.fieldHint}>
				<strong>Media</strong>: <strong>Direct Play</strong> skips Jellyfin, Plex, and Emby (no media server in this
				stack). Otherwise enable one or more servers. <strong>Jellyfin</strong> is on by default. Other categories
				below are single-choice where noted.
			</p>

			<h3 className={styles.subsectionHeading}>Media players</h3>
			<ChoiceGrid>
				<StaggerChoice index={0} reduceMotion={props.reduceMotion}>
					<ChoiceCard
						reduceMotion={props.reduceMotion}
						selected={
							!props.s.media.jellyfin && !props.s.media.plex && !props.s.media.emby
						}
						onClick={() =>
							props.setS((p) => ({
								...p,
								media: { jellyfin: false, plex: false, emby: false },
								jellyfinHwAccel: 'none'
							}))
						}
						title="Direct Play"
						description="No media server. Use your own players"
						iconLabel="Play"
					/>
				</StaggerChoice>
				<StaggerChoice index={1} reduceMotion={props.reduceMotion}>
					<ChoiceCard
						reduceMotion={props.reduceMotion}
						selected={props.s.media.jellyfin}
						onClick={() =>
							props.setS((p) => ({
								...p,
								media: { ...p.media, jellyfin: !p.media.jellyfin }
							}))
						}
						title="Jellyfin"
						iconSlug="jellyfin"
					/>
				</StaggerChoice>
				<StaggerChoice index={2} reduceMotion={props.reduceMotion}>
					<ChoiceCard
						reduceMotion={props.reduceMotion}
						selected={props.s.media.plex}
						onClick={() => props.setS((p) => ({ ...p, media: { ...p.media, plex: !p.media.plex } }))}
						title="Plex"
						iconSlug="plex"
					/>
				</StaggerChoice>
				<StaggerChoice index={3} reduceMotion={props.reduceMotion}>
					<ChoiceCard
						reduceMotion={props.reduceMotion}
						selected={props.s.media.emby}
						onClick={() => props.setS((p) => ({ ...p, media: { ...p.media, emby: !p.media.emby } }))}
						title="Emby"
						iconSlug="emby"
					/>
				</StaggerChoice>
			</ChoiceGrid>
			{props.s.media.jellyfin && (
				<>
					<p className={clsx(styles.fieldHint, 'margin-top--md')}>
						Compose sets <code>JELLYFIN_PublishedServerUrl</code> to <code>{props.jellyfinPublishedPreview}</code>. In
						direct mode, replace <code>127.0.0.1</code> with your LAN IP or public URL if needed.
					</p>
					<div className={clsx(styles.fieldRow, 'margin-top--md')}>
						<label className={styles.fieldRowLabel} htmlFor="jfHw">
							Jellyfin hardware acceleration (Linux hosts)
						</label>
						<div className={styles.fieldRowControl}>
							<select
								id="jfHw"
								value={props.s.jellyfinHwAccel}
								onChange={(e) =>
									props.setField('jellyfinHwAccel', e.target.value as JellyfinHwAccel)
								}
							>
								<option value="none">None (CPU transcoding only)</option>
								<option value="vaapi">VAAPI: Intel/AMD (device /dev/dri)</option>
								<option value="nvenc">NVIDIA NVENC (requires NVIDIA Container Toolkit)</option>
							</select>
						</div>
					</div>
				</>
			)}

			<h3 className={styles.subsectionHeading}>Usenet downloader</h3>
			<p className={styles.fieldHint}>At most one.</p>
			<ChoiceGrid>
				<StaggerChoice index={0} reduceMotion={props.reduceMotion}>
					<ChoiceCard
						reduceMotion={props.reduceMotion}
						selected={props.s.nzbChoice === 'none'}
						onClick={() => props.setField('nzbChoice', 'none')}
						title="None"
						iconLabel="None"
					/>
				</StaggerChoice>
				<StaggerChoice index={1} reduceMotion={props.reduceMotion}>
					<ChoiceCard
						reduceMotion={props.reduceMotion}
						selected={props.s.nzbChoice === 'sabnzbd'}
						onClick={() => props.setField('nzbChoice', 'sabnzbd')}
						title="SABnzbd"
						iconSlug="sabnzbd"
					/>
				</StaggerChoice>
				<StaggerChoice index={2} reduceMotion={props.reduceMotion}>
					<ChoiceCard
						reduceMotion={props.reduceMotion}
						selected={props.s.nzbChoice === 'nzbget'}
						onClick={() => props.setField('nzbChoice', 'nzbget')}
						title="NZBGet"
						iconSlug="nzbget"
					/>
				</StaggerChoice>
			</ChoiceGrid>

			<h3 className={styles.subsectionHeading}>WebDAV / streaming</h3>
			<p className={styles.fieldHint}>At most one (NZBDav vs Altmount).</p>
			<ChoiceGrid>
				<StaggerChoice index={0} reduceMotion={props.reduceMotion}>
					<ChoiceCard
						reduceMotion={props.reduceMotion}
						selected={props.s.davChoice === 'none'}
						onClick={() => props.setField('davChoice', 'none')}
						title="None"
						iconLabel="None"
					/>
				</StaggerChoice>
				<StaggerChoice index={1} reduceMotion={props.reduceMotion}>
					<ChoiceCard
						reduceMotion={props.reduceMotion}
						selected={props.s.davChoice === 'nzbdav'}
						onClick={() => props.setField('davChoice', 'nzbdav')}
						title="NZBDav"
						iconSlug="nzbdav"
					/>
				</StaggerChoice>
				<StaggerChoice index={2} reduceMotion={props.reduceMotion}>
					<ChoiceCard
						reduceMotion={props.reduceMotion}
						selected={props.s.davChoice === 'altmount'}
						onClick={() => props.setField('davChoice', 'altmount')}
						title="Altmount"
						iconSlug="altmount"
					/>
				</StaggerChoice>
			</ChoiceGrid>

			<h3 className={styles.subsectionHeading}>Torrent client</h3>
			<p className={styles.fieldHint}>At most one.</p>
			<ChoiceGrid>
				<StaggerChoice index={0} reduceMotion={props.reduceMotion}>
					<ChoiceCard
						reduceMotion={props.reduceMotion}
						selected={props.s.torrentChoice === 'none'}
						onClick={() => props.onTorrentPick('none')}
						title="None"
						iconLabel="None"
					/>
				</StaggerChoice>
				<StaggerChoice index={1} reduceMotion={props.reduceMotion}>
					<ChoiceCard
						reduceMotion={props.reduceMotion}
						selected={props.s.torrentChoice === 'qbittorrent'}
						onClick={() => props.onTorrentPick('qbittorrent')}
						title="qBittorrent"
						iconSlug="qbittorrent"
					/>
				</StaggerChoice>
				<StaggerChoice index={2} reduceMotion={props.reduceMotion}>
					<ChoiceCard
						reduceMotion={props.reduceMotion}
						selected={props.s.torrentChoice === 'transmission'}
						onClick={() => props.onTorrentPick('transmission')}
						title="Transmission"
						iconSlug="transmission"
					/>
				</StaggerChoice>
				<StaggerChoice index={3} reduceMotion={props.reduceMotion}>
					<ChoiceCard
						reduceMotion={props.reduceMotion}
						selected={props.s.torrentChoice === 'deluge'}
						onClick={() => props.onTorrentPick('deluge')}
						title="Deluge"
						iconSlug="deluge"
					/>
				</StaggerChoice>
				<StaggerChoice index={4} reduceMotion={props.reduceMotion}>
					<ChoiceCard
						reduceMotion={props.reduceMotion}
						selected={props.s.torrentChoice === 'rtorrent'}
						onClick={() => props.onTorrentPick('rtorrent')}
						title="ruTorrent"
						description="rTorrent stack"
						iconSlug="qbittorrent"
					/>
				</StaggerChoice>
			</ChoiceGrid>

			<h3 className={styles.subsectionHeading}>Extras</h3>
			<ChoiceGrid>
				<StaggerChoice index={0} reduceMotion={props.reduceMotion}>
					<ChoiceCard
						reduceMotion={props.reduceMotion}
						selected={props.s.extrasAria2}
						onClick={() => props.setS((p) => ({ ...p, extrasAria2: !p.extrasAria2 }))}
						title="aria2"
						iconSlug="aria2"
					/>
				</StaggerChoice>
				<StaggerChoice index={1} reduceMotion={props.reduceMotion}>
					<ChoiceCard
						reduceMotion={props.reduceMotion}
						selected={props.s.extrasBitmagnet}
						onClick={() => props.setS((p) => ({ ...p, extrasBitmagnet: !p.extrasBitmagnet }))}
						title="Bitmagnet"
						description="Includes Postgres + Redis"
						iconSlug="bittorrent"
					/>
				</StaggerChoice>
			</ChoiceGrid>
		</>
	);
}
