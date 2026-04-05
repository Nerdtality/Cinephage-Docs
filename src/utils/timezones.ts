/** Put UTC first, then sort the rest alphabetically (IANA ids). */
export function sortTimeZonesWithUtcFirst(zones: string[]): string[] {
	const uniq = [...new Set(zones)];
	const rest = uniq.filter((z) => z !== 'UTC').sort((a, b) => a.localeCompare(b));
	return uniq.includes('UTC') ? ['UTC', ...rest] : rest.sort((a, b) => a.localeCompare(b));
}

/** IANA time zone ids; UTC first, then alphabetical. */
export function listIanaTimeZones(): string[] {
	try {
		const fn = (
			Intl as unknown as { supportedValuesOf?: (k: string) => string[] }
		).supportedValuesOf;
		if (typeof fn === 'function') {
			return sortTimeZonesWithUtcFirst([...fn('timeZone')]);
		}
	} catch {
		/* ignore */
	}
	return sortTimeZonesWithUtcFirst([...FALLBACK_TIMEZONES]);
}

const FALLBACK_TIMEZONES = [
	'UTC',
	'America/New_York',
	'America/Chicago',
	'America/Denver',
	'America/Los_Angeles',
	'America/Toronto',
	'America/Sao_Paulo',
	'America/Vancouver',
	'Europe/London',
	'Europe/Paris',
	'Europe/Berlin',
	'Europe/Moscow',
	'Africa/Johannesburg',
	'Asia/Dubai',
	'Asia/Singapore',
	'Asia/Tokyo',
	'Asia/Shanghai',
	'Australia/Sydney',
	'Pacific/Auckland'
] as const;

export function getBrowserTimeZone(): string {
	try {
		return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
	} catch {
		return 'UTC';
	}
}

export function filterTimeZones(zones: string[], query: string): string[] {
	const q = query.trim().toLowerCase();
	if (!q) return zones;
	return zones.filter((z) => z.toLowerCase().includes(q));
}
