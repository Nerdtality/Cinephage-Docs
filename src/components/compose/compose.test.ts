import { describe, expect, it } from 'vitest';
import { collectWarnings, generateStackOutput } from './generateDockerCompose';
import {
	defaultDirectHostPorts,
	defaultStackState,
	normalizeApexDomain,
	resolveStack
} from './types';
import { hasDirectPortConflicts, validationErrorForStep } from './validateStackState';

describe('normalizeApexDomain', () => {
	it('strips scheme and path', () => {
		expect(normalizeApexDomain('https://cinephage.example.com/foo')).toBe('example.com');
	});

	it('strips cinephage prefix', () => {
		expect(normalizeApexDomain('cinephage.media.example.com')).toBe('media.example.com');
	});
});

const stackWithTz = { ...defaultStackState, tz: 'UTC' };

describe('generateStackOutput', () => {
	it('includes dotEnv and compose', () => {
		const out = generateStackOutput(stackWithTz);
		expect(out.dotEnv.length).toBeGreaterThan(20);
		expect(out.composeYaml).toContain('cinephage-stack');
		expect(out.composeYaml).toContain('BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}');
		expect(out.dotEnv).toContain('BETTER_AUTH_SECRET=');
		expect(out.caddyfile).toBeNull();
		expect(out.traefikDynamicYaml).toBeNull();
	});

	it('embeds Better Auth secret in dotEnv when set', () => {
		const secret = 'test-better-auth-secret';
		const out = generateStackOutput({ ...stackWithTz, betterAuthSecret: secret });
		expect(out.dotEnv).toContain(`BETTER_AUTH_SECRET=${secret}`);
	});

	it('emits Traefik dynamic config when proxyMode is traefik', () => {
		const out = generateStackOutput({
			...stackWithTz,
			proxyMode: 'traefik',
			apexDomain: 'example.com'
		});
		expect(out.traefikDynamicYaml).toContain('http:');
		expect(out.traefikDynamicYaml).toContain('cinephage.example.com');
		expect(out.composeYaml).toContain('traefik:');
	});

	it('uses Caddy Docker Proxy with Docker socket when proxyMode is caddy', () => {
		const out = generateStackOutput({
			...stackWithTz,
			proxyMode: 'caddy',
			apexDomain: 'example.com'
		});
		expect(out.composeYaml).toContain('lucaslorentz/caddy-docker-proxy');
		expect(out.composeYaml).toContain('/var/run/docker.sock');
		expect(out.composeYaml).toContain('caddy.reverse_proxy');
		expect(out.caddyfile).toBeNull();
	});

	it('omits host 8080 on Gluetun for qBittorrent Web UI when using reverse proxy', () => {
		const out = generateStackOutput({
			...stackWithTz,
			proxyMode: 'caddy',
			apexDomain: 'example.com',
			torrentChoice: 'qbittorrent',
			vpnPreset: 'protonvpn'
		});
		expect(out.composeYaml).toContain('gluetun');
		expect(out.composeYaml).not.toContain('8080:8080');
		expect(out.composeYaml).toMatch(/gluetun:[\s\S]*?expose:[\s\S]*?8080/);
	});

	it('adds Gluetun for aria2 when VPN is on without a primary torrent client', () => {
		const out = generateStackOutput({
			...stackWithTz,
			torrentChoice: 'none',
			extrasAria2: true,
			vpnPreset: 'protonvpn',
			protonVpn: { ...defaultStackState.protonVpn, wireguardPrivateKey: 'x' }
		});
		expect(out.composeYaml).toContain('container_name: gluetun');
		expect(out.composeYaml).toContain('network_mode: service:gluetun');
		expect(out.composeYaml).toContain('container_name: aria2');
	});

	it('warns when multiple media servers are enabled', () => {
		const s = {
			...stackWithTz,
			media: { jellyfin: true, plex: true, emby: false }
		};
		const w = collectWarnings(resolveStack(s));
		expect(w.some((x) => x.includes('Multiple media servers'))).toBe(true);
	});

	it('adds Gluetun control-server API key env and port forwarding when GSP + Proton', () => {
		const gspKey = 'aabbccddeeff00112233445566778899aabbccddeeff';
		const out = generateStackOutput({
			...stackWithTz,
			torrentChoice: 'qbittorrent',
			vpnPreset: 'protonvpn',
			useGspPortSync: true,
			gspGtnApiKey: gspKey
		});
		expect(out.composeYaml).toContain('HTTP_CONTROL_SERVER_AUTH_DEFAULT_ROLE');
		expect(out.composeYaml).toContain('VPN_PORT_FORWARDING=on');
		expect(out.composeYaml).toContain('GSP_GTN_API_KEY');
		expect(out.composeYaml).not.toContain('GSP_QBT_');
		expect(out.dotEnv).toContain(`GSP_GTN_API_KEY=${gspKey}`);
		expect(out.composeYaml).toContain('VPN_SERVICE_PROVIDER=protonvpn');
		expect(out.composeYaml).toContain('WIREGUARD_PRIVATE_KEY=${WIREGUARD_PRIVATE_KEY}');
	});

	it('emits Proton SERVER_* filters in dotEnv from wizard state', () => {
		const out = generateStackOutput({
			...stackWithTz,
			torrentChoice: 'qbittorrent',
			vpnPreset: 'protonvpn',
			protonVpn: {
				...defaultStackState.protonVpn,
				serverCountries: 'Netherlands',
				serverRegions: '',
				serverCities: ''
			}
		});
		expect(out.dotEnv).toContain('SERVER_COUNTRIES=Netherlands');
	});
});

describe('hasDirectPortConflicts', () => {
	it('detects duplicate host ports', () => {
		const d = defaultDirectHostPorts();
		const s = {
			...stackWithTz,
			proxyMode: 'direct' as const,
			directPorts: { ...d, jellyfin: 8096, plex: 8096 },
			media: { jellyfin: true, plex: true, emby: false }
		};
		expect(hasDirectPortConflicts(s)).toBe(true);
	});
});

describe('validationErrorForStep', () => {
	it('requires paths on step 1', () => {
		expect(validationErrorForStep(1, { ...defaultStackState, pathConfig: '' })).not.toBeNull();
	});

	it('requires timezone on step 1', () => {
		expect(validationErrorForStep(1, { ...defaultStackState, tz: '' })).toBe('Select a timezone.');
	});

	it('requires valid URL for direct ORIGIN on step 2', () => {
		const bad = validationErrorForStep(2, { ...defaultStackState, directOrigin: 'not-a-url' });
		expect(bad).not.toBeNull();
		const ok = validationErrorForStep(2, { ...defaultStackState, directOrigin: 'http://localhost:3000' });
		expect(ok).toBeNull();
	});

	it('does not block VPN step when fields are empty', () => {
		const s = {
			...defaultStackState,
			torrentChoice: 'qbittorrent' as const,
			vpnPreset: 'protonvpn' as const,
			protonVpn: { ...defaultStackState.protonVpn, wireguardPrivateKey: '' }
		};
		expect(validationErrorForStep(4, s)).toBeNull();
	});
});
