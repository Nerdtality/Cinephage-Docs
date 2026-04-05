/** 32 random bytes, Base64-encoded (same idea as `openssl rand -base64 32`). */
export function generateBetterAuthSecret(): string {
	const bytes = new Uint8Array(32);
	crypto.getRandomValues(bytes);
	let binary = '';
	for (let i = 0; i < bytes.length; i++) {
		binary += String.fromCharCode(bytes[i]!);
	}
	return btoa(binary);
}

/** Random hex string for Gluetun control server / GSP (`GSP_GTN_API_KEY`). Avoids base64 `/` + padding in `.env`. */
export function generateGspGtnApiKey(): string {
	const bytes = new Uint8Array(24);
	crypto.getRandomValues(bytes);
	return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
}
