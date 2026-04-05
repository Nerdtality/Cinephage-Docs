import { describe, expect, it } from 'vitest';
import { parseWireGuardConf, parseWireGuardPrivateKeyOnly, splitWireGuardEndpoint } from './parseWireGuardConf';

const minimalConf = `[Interface]
PrivateKey = YFJp456defABC=
Address = 10.2.0.3/32

[Peer]
PublicKey = peerPubKeyBase64Here=
PresharedKey = pskOptional=
Endpoint = 185.1.2.3:51820
`;

describe('splitWireGuardEndpoint', () => {
	it('splits IPv4 host and port', () => {
		expect(splitWireGuardEndpoint('185.1.2.3:51820')).toEqual({ host: '185.1.2.3', port: '51820' });
	});

	it('defaults port when missing', () => {
		expect(splitWireGuardEndpoint('185.1.2.3')).toEqual({ host: '185.1.2.3', port: '51820' });
	});

	it('handles IPv6 bracket endpoint', () => {
		expect(splitWireGuardEndpoint('[2001:db8::1]:51820')).toEqual({ host: '2001:db8::1', port: '51820' });
	});
});

describe('parseWireGuardConf', () => {
	it('parses a minimal valid config', () => {
		const r = parseWireGuardConf(minimalConf);
		expect(r.ok).toBe(true);
		if (!r.ok) return;
		expect(r.data.wireguardPrivateKey).toBe('YFJp456defABC=');
		expect(r.data.wireguardAddresses).toBe('10.2.0.3/32');
		expect(r.data.wireguardPublicKey).toBe('peerPubKeyBase64Here=');
		expect(r.data.wireguardPresharedKey).toBe('pskOptional=');
		expect(r.data.wireguardEndpointIp).toBe('185.1.2.3');
		expect(r.data.wireguardEndpointPort).toBe('51820');
	});

	it('extracts PrivateKey only for Gluetun + Proton', () => {
		const r = parseWireGuardPrivateKeyOnly(minimalConf);
		expect(r.ok).toBe(true);
		if (!r.ok) return;
		expect(r.privateKey).toBe('YFJp456defABC=');
	});

	it('PrivateKey-only parse rejects missing PrivateKey', () => {
		const r = parseWireGuardPrivateKeyOnly(`[Interface]
Address = 10.0.0.1/32
`);
		expect(r.ok).toBe(false);
		if (r.ok) return;
		expect(r.message).toMatch(/PrivateKey/i);
	});

	it('rejects empty input', () => {
		const r = parseWireGuardConf('   ');
		expect(r.ok).toBe(false);
		if (r.ok) return;
		expect(r.message).toMatch(/empty/i);
	});

	it('rejects missing PrivateKey', () => {
		const r = parseWireGuardConf(`[Interface]
Address = 10.0.0.1/32
[Peer]
PublicKey = x=
Endpoint = 1.1.1.1:51820
`);
		expect(r.ok).toBe(false);
		if (r.ok) return;
		expect(r.message).toMatch(/PrivateKey/i);
	});

	it('uses first [Peer] only when multiple peers present', () => {
		const r = parseWireGuardConf(`${minimalConf}
[Peer]
PublicKey = secondPeer=
Endpoint = 9.9.9.9:51820
`);
		expect(r.ok).toBe(true);
		if (!r.ok) return;
		expect(r.data.wireguardPublicKey).toBe('peerPubKeyBase64Here=');
		expect(r.data.wireguardEndpointIp).toBe('185.1.2.3');
	});

	it('strips inline comments on lines', () => {
		const r = parseWireGuardConf(`[Interface]
PrivateKey = abc= # comment
Address = 10.0.0.2/32

[Peer]
PublicKey = def=
Endpoint = 1.2.3.4:12345
`);
		expect(r.ok).toBe(true);
		if (!r.ok) return;
		expect(r.data.wireguardPrivateKey).toBe('abc=');
	});
});
