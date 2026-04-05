import type { ChangeEvent, ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import {
	parseWireGuardConf,
	parseWireGuardPrivateKeyOnly,
	parsedWireGuardToCustomWireGuard,
	parsedWireGuardToMullvadVpn
} from '@site/src/components/compose/parseWireGuardConf';
import type { StackConfiguratorState } from '@site/src/components/compose/types';
import {
	ChoiceCard,
	ChoiceGrid,
	StaggerChoice
} from '@site/src/components/docker-configurator/ChoiceCards';
import styles from '@site/src/components/docker-configurator/docker-configurator.module.css';

export function VpnPhase(props: {
	s: StackConfiguratorState;
	setField: <K extends keyof StackConfiguratorState>(key: K, value: StackConfiguratorState[K]) => void;
	setCustomVpn: (patch: Partial<StackConfiguratorState['customVpn']>) => void;
	setProtonVpn: (patch: Partial<StackConfiguratorState['protonVpn']>) => void;
	setMullvadVpn: (patch: Partial<StackConfiguratorState['mullvadVpn']>) => void;
	onRegenerateGspKey: () => void;
	reduceMotion: boolean;
}): ReactNode {
	const [wgImportError, setWgImportError] = useState<string | null>(null);

	useEffect(() => {
		setWgImportError(null);
	}, [props.s.vpnPreset, props.s.customVpn.vpnType]);

	const applyWireGuardFileText = useCallback(
		(text: string) => {
			const preset = props.s.vpnPreset;
			if (preset === 'protonvpn') {
				const r = parseWireGuardPrivateKeyOnly(text);
				if (r.ok === false) {
					setWgImportError(r.message);
					return;
				}
				setWgImportError(null);
				props.setProtonVpn({ wireguardPrivateKey: r.privateKey });
				return;
			}
			const r = parseWireGuardConf(text);
			if (r.ok === false) {
				setWgImportError(r.message);
				return;
			}
			setWgImportError(null);
			if (preset === 'mullvad') {
				props.setMullvadVpn(parsedWireGuardToMullvadVpn(r.data));
			} else if (preset === 'custom' && props.s.customVpn.vpnType === 'wireguard') {
				props.setCustomVpn(parsedWireGuardToCustomWireGuard(r.data));
			}
		},
		[props.s.vpnPreset, props.s.customVpn.vpnType, props.setProtonVpn, props.setMullvadVpn, props.setCustomVpn]
	);

	const onWgFileChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const f = e.target.files?.[0];
			e.target.value = '';
			if (!f) return;
			const reader = new FileReader();
			reader.onload = () => {
				const text = typeof reader.result === 'string' ? reader.result : '';
				applyWireGuardFileText(text);
			};
			reader.readAsText(f);
		},
		[applyWireGuardFileText]
	);

	const showGspChoice =
		props.s.torrentChoice === 'qbittorrent' && props.s.vpnPreset !== 'none';

	const wireGuardImportRow = (show: boolean) =>
		show ?
			<>
				<div className={styles.fieldRow}>
					<span className={styles.fieldRowLabel}>WireGuard file</span>
					<div className={styles.fieldRowControl}>
						<label className="button button--secondary button--sm" style={{ cursor: 'pointer', width: 'fit-content' }}>
							Import .conf
							<input
								type="file"
								accept=".conf,.txt,text/plain"
								style={{ display: 'none' }}
								onChange={onWgFileChange}
							/>
						</label>
						<p className={styles.fieldHint} style={{ marginTop: '0.35rem' }}>
							Parsed locally in your browser; not uploaded.{' '}
							{props.s.vpnPreset === 'protonvpn' ?
								'Proton: only PrivateKey is extracted.'
							:	'You can still edit the fields below.'}
						</p>
					</div>
				</div>
				{wgImportError ?
					<p className={styles.validationError} role="status">
						{wgImportError}
					</p>
				:	null}
			</>
		:	null;

	const needsVpn =
		props.s.torrentChoice !== 'none' || props.s.extrasAria2 || props.s.extrasBitmagnet;

	return (
		<>
			<h2 className={styles.stepHeading}>VPN</h2>
			{!needsVpn ?
				<p className={styles.fieldHint}>
					No torrent client or aria2/Bitmagnet selected; Gluetun is not used. Continue to review.
				</p>
			:	<>
					<p className={styles.fieldHint}>
						{props.s.torrentChoice !== 'none' ?
							<>
								Routes VPN traffic for your torrent client. The generated compose uses <code>{'${VAR}'}</code>{' '}
								references only; fill in the generated <code>.env</code> on the review step. Proton + Gluetun uses
								your <code>PrivateKey</code> only (import a .conf to copy it). Mullvad/custom WireGuard can import a
								full <code>.conf</code> where applicable.
							</>
						:	<>
								Routes VPN traffic for aria2/Bitmagnet via Gluetun (peers and trackers see the VPN exit IP). The
								generated compose uses <code>{'${VAR}'}</code> references only; fill in the generated{' '}
								<code>.env</code> on the review step.
							</>
						}
					</p>
					<ChoiceGrid>
						<StaggerChoice index={0} reduceMotion={props.reduceMotion}>
							<ChoiceCard
								reduceMotion={props.reduceMotion}
								selected={props.s.vpnPreset === 'none'}
								onClick={() => props.setField('vpnPreset', 'none')}
								title="None"
								description="No Gluetun"
								iconLabel="Off"
							/>
						</StaggerChoice>
						<StaggerChoice index={1} reduceMotion={props.reduceMotion}>
							<ChoiceCard
								reduceMotion={props.reduceMotion}
								selected={props.s.vpnPreset === 'protonvpn'}
								onClick={() => props.setField('vpnPreset', 'protonvpn')}
								title="ProtonVPN"
								description="WireGuard via Gluetun"
								iconSlug="protonvpn"
							/>
						</StaggerChoice>
						<StaggerChoice index={2} reduceMotion={props.reduceMotion}>
							<ChoiceCard
								reduceMotion={props.reduceMotion}
								selected={props.s.vpnPreset === 'mullvad'}
								onClick={() => props.setField('vpnPreset', 'mullvad')}
								title="Mullvad"
								description="WireGuard via Gluetun"
								iconSlug="customvpn"
							/>
						</StaggerChoice>
						<StaggerChoice index={3} reduceMotion={props.reduceMotion}>
							<ChoiceCard
								reduceMotion={props.reduceMotion}
								selected={props.s.vpnPreset === 'custom'}
								onClick={() => props.setField('vpnPreset', 'custom')}
								title="Custom"
								description="OpenVPN or WireGuard"
								iconSlug="customvpn"
							/>
						</StaggerChoice>
					</ChoiceGrid>

					{showGspChoice && (
						<div className={styles.gspOptionalBlock}>
							<h3 className={styles.subsectionHeading}>Use GSP for automatic port forwarding?</h3>
							<p className={styles.fieldHint}>
								The <strong>GSP</strong> LinuxServer mod keeps qBittorrent’s listening port aligned with Gluetun’s
								forwarded port.
							</p>
							<ChoiceGrid>
								<StaggerChoice index={0} reduceMotion={props.reduceMotion}>
									<ChoiceCard
										reduceMotion={props.reduceMotion}
										selected={props.s.useGspPortSync}
										onClick={() => props.setField('useGspPortSync', true)}
										title="Yes"
										description="Enable GSP so the forwarded port syncs automatically"
										iconLabel="Y"
									/>
								</StaggerChoice>
								<StaggerChoice index={1} reduceMotion={props.reduceMotion}>
									<ChoiceCard
										reduceMotion={props.reduceMotion}
										selected={!props.s.useGspPortSync}
										onClick={() => props.setField('useGspPortSync', false)}
										title="No"
										description="I’ll manage the listening port myself"
										iconLabel="N"
									/>
								</StaggerChoice>
							</ChoiceGrid>

							{props.s.useGspPortSync ?
								<div className={styles.gspCallout}>
									<div className={styles.fieldRow}>
										<label className={styles.fieldRowLabel} htmlFor="gspGtnApiKey">
											GSP / Gluetun API key
										</label>
										<div className={styles.fieldRowControl}>
											<div className={styles.row2}>
												<input
													id="gspGtnApiKey"
													type="text"
													autoComplete="off"
													readOnly
													value={props.s.gspGtnApiKey}
													spellCheck={false}
												/>
												<button type="button" className="button button--secondary" onClick={props.onRegenerateGspKey}>
													Regenerate
												</button>
											</div>
										</div>
									</div>
									<p className={styles.fieldHint}>
										In qBittorrent Web UI: enable <strong>Bypass authentication for clients on localhost</strong> so
										the GSP mod can reach the Web API from the same container.
									</p>
									<details className={styles.gspDetails}>
										<summary className={styles.gspSummary}>Docs</summary>
										<ul className={styles.gspSpoilerList}>
											<li>
												<a
													href="https://github.com/t-anc/GSP-Qbittorent-Gluetun-sync-port-mod"
													target="_blank"
													rel="noreferrer noopener"
												>
													GSP mod (t-anc)
												</a>
											</li>
											<li>
												<a
													href="https://github.com/qdm12/gluetun-wiki/blob/main/setup/advanced/control-server.md"
													target="_blank"
													rel="noreferrer noopener"
												>
													Gluetun control server
												</a>
											</li>
										</ul>
									</details>
								</div>
							:	<p className={styles.fieldHint}>
									GSP is omitted from the generated file. You can add the mod later from{' '}
									<a
										href="https://github.com/t-anc/GSP-Qbittorent-Gluetun-sync-port-mod"
										target="_blank"
										rel="noreferrer noopener"
									>
										t-anc/GSP-Qbittorent-Gluetun-sync-port-mod
									</a>
									.
								</p>
							}
						</div>
					)}

					{props.s.vpnPreset === 'mullvad' && (
						<div className="margin-top--md">
							<p className={styles.fieldHint}>
								<strong>Mullvad + Gluetun</strong>: use a WireGuard private key from your{' '}
								<a href="https://mullvad.net/account" target="_blank" rel="noreferrer noopener">
									Mullvad account
								</a>
								. See{' '}
								<a href="https://github.com/qdm12/gluetun-wiki" target="_blank" rel="noreferrer noopener">
									gluetun-wiki
								</a>{' '}
								for provider-specific options.
							</p>
							{wireGuardImportRow(true)}
							<div className={styles.fieldRow}>
								<label className={styles.fieldRowLabel} htmlFor="mvWg">
									WIREGUARD_PRIVATE_KEY
								</label>
								<div className={styles.fieldRowControl}>
									<input
										id="mvWg"
										type="text"
										autoComplete="off"
										spellCheck={false}
										value={props.s.mullvadVpn.wireguardPrivateKey}
										onChange={(e) => props.setMullvadVpn({ wireguardPrivateKey: e.target.value })}
									/>
								</div>
							</div>
							<div className={styles.fieldRow}>
								<label className={styles.fieldRowLabel} htmlFor="mvCountries">
									SERVER_COUNTRIES (optional)
								</label>
								<div className={styles.fieldRowControl}>
									<input
										id="mvCountries"
										type="text"
										value={props.s.mullvadVpn.serverCountries}
										onChange={(e) => props.setMullvadVpn({ serverCountries: e.target.value })}
										placeholder="e.g. CH or leave empty"
									/>
								</div>
							</div>
						</div>
					)}

					{props.s.vpnPreset === 'protonvpn' && (
						<div className="margin-top--md">
							<p className={styles.fieldHint}>
								<strong>ProtonVPN + Gluetun (WireGuard)</strong>. Gluetun uses{' '}
								<code>VPN_SERVICE_PROVIDER=protonvpn</code> and your <code>PrivateKey</code> only; it selects servers from
								Proton’s list using optional filters below. See{' '}
								<a
									href="https://github.com/qdm12/gluetun-wiki/blob/main/setup/providers/protonvpn.md"
									target="_blank"
									rel="noreferrer noopener"
								>
									gluetun-wiki: ProtonVPN
								</a>
								.
							</p>
							<ol className={styles.protonSteps}>
								<li>
									Generate a WireGuard configuration in your{' '}
									<a href="https://account.proton.me/u/0/vpn/WireGuard" target="_blank" rel="noreferrer noopener">
										Proton account (WireGuard)
									</a>{' '}
									and copy the <code>PrivateKey</code>, or use <strong>Import .conf</strong> below.
								</li>
								<li>
									Optional: set <code>SERVER_COUNTRIES</code> / regions / cities to narrow which Proton server Gluetun
									connects to (leave empty to let Gluetun choose).
								</li>
								<li>
									Store secrets in a local <code>.env</code> file; the generated compose uses <code>{'${VAR}'}</code>{' '}
									references only.
								</li>
							</ol>
							{wireGuardImportRow(true)}
							<div className={styles.fieldRow}>
								<label className={styles.fieldRowLabel} htmlFor="wgPriv">
									WIREGUARD_PRIVATE_KEY
								</label>
								<div className={styles.fieldRowControl}>
									<input
										id="wgPriv"
										type="text"
										autoComplete="off"
										spellCheck={false}
										value={props.s.protonVpn.wireguardPrivateKey}
										onChange={(e) => props.setProtonVpn({ wireguardPrivateKey: e.target.value })}
									/>
								</div>
							</div>
							<div className={styles.fieldRow}>
								<label className={styles.fieldRowLabel} htmlFor="pvCountries">
									SERVER_COUNTRIES (optional)
								</label>
								<div className={styles.fieldRowControl}>
									<input
										id="pvCountries"
										type="text"
										value={props.s.protonVpn.serverCountries}
										onChange={(e) => props.setProtonVpn({ serverCountries: e.target.value })}
										placeholder="e.g. Netherlands"
									/>
								</div>
							</div>
							<div className={styles.fieldRow}>
								<label className={styles.fieldRowLabel} htmlFor="pvRegions">
									SERVER_REGIONS (optional)
								</label>
								<div className={styles.fieldRowControl}>
									<input
										id="pvRegions"
										type="text"
										value={props.s.protonVpn.serverRegions}
										onChange={(e) => props.setProtonVpn({ serverRegions: e.target.value })}
									/>
								</div>
							</div>
							<div className={styles.fieldRow}>
								<label className={styles.fieldRowLabel} htmlFor="pvCities">
									SERVER_CITIES (optional)
								</label>
								<div className={styles.fieldRowControl}>
									<input
										id="pvCities"
										type="text"
										value={props.s.protonVpn.serverCities}
										onChange={(e) => props.setProtonVpn({ serverCities: e.target.value })}
									/>
								</div>
							</div>
						</div>
					)}

					{props.s.vpnPreset === 'custom' && (
						<div className="margin-top--md">
							<div className={styles.fieldRow}>
								<label className={styles.fieldRowLabel} htmlFor="vpnType">
									VPN type
								</label>
								<div className={styles.fieldRowControl}>
									<select
										id="vpnType"
										value={props.s.customVpn.vpnType}
										onChange={(e) =>
											props.setCustomVpn({
												vpnType: e.target.value as 'openvpn' | 'wireguard'
											})
										}
									>
										<option value="wireguard">WireGuard</option>
										<option value="openvpn">OpenVPN</option>
									</select>
								</div>
							</div>
							<div className={styles.fieldRow}>
								<label className={styles.fieldRowLabel} htmlFor="vpnProv">
									Provider string (Gluetun)
								</label>
								<div className={styles.fieldRowControl}>
									<input
										id="vpnProv"
										type="text"
										value={props.s.customVpn.provider}
										onChange={(e) => props.setCustomVpn({ provider: e.target.value })}
										placeholder="custom"
									/>
								</div>
							</div>
							{props.s.customVpn.vpnType === 'wireguard' ?
								<>
									{wireGuardImportRow(true)}
									<div className={styles.fieldRow}>
										<label className={styles.fieldRowLabel} htmlFor="customWgPriv">
											WireGuard private key (placeholder)
										</label>
										<div className={styles.fieldRowControl}>
											<input
												id="customWgPriv"
												type="text"
												value={props.s.customVpn.wireguardPrivateKey}
												onChange={(e) => props.setCustomVpn({ wireguardPrivateKey: e.target.value })}
												autoComplete="off"
											/>
										</div>
									</div>
									<div className={styles.fieldRow}>
										<label className={styles.fieldRowLabel} htmlFor="customWgAddr">
											WireGuard addresses (placeholder)
										</label>
										<div className={styles.fieldRowControl}>
											<input
												id="customWgAddr"
												type="text"
												value={props.s.customVpn.wireguardAddresses}
												onChange={(e) => props.setCustomVpn({ wireguardAddresses: e.target.value })}
												placeholder="10.2.0.2/32"
											/>
										</div>
									</div>
								</>
							:	<>
									<div className={styles.fieldRow}>
										<label className={styles.fieldRowLabel} htmlFor="customOvpnUser">
											OpenVPN user (placeholder)
										</label>
										<div className={styles.fieldRowControl}>
											<input
												id="customOvpnUser"
												type="text"
												value={props.s.customVpn.openvpnUser}
												onChange={(e) => props.setCustomVpn({ openvpnUser: e.target.value })}
											/>
										</div>
									</div>
									<div className={styles.fieldRow}>
										<label className={styles.fieldRowLabel} htmlFor="customOvpnPass">
											OpenVPN password (placeholder)
										</label>
										<div className={styles.fieldRowControl}>
											<input
												id="customOvpnPass"
												type="text"
												value={props.s.customVpn.openvpnPassword}
												onChange={(e) => props.setCustomVpn({ openvpnPassword: e.target.value })}
												autoComplete="off"
												spellCheck={false}
											/>
										</div>
									</div>
								</>
							}
						</div>
					)}
				</>
			}
		</>
	);
}
