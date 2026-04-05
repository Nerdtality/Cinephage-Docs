import type { HostOs } from '@site/src/components/compose/types';

export function pathHintsForHost(os: HostOs): { config: string; media: string; downloads: string } {
	switch (os) {
		case 'windows':
			return {
				config: 'D:\\cinephage\\config',
				media: 'D:\\Media',
				downloads: 'D:\\Downloads'
			};
		case 'mac':
			return {
				config: '/Users/you/cinephage/config',
				media: '/Users/you/Media',
				downloads: '/Users/you/Downloads'
			};
		case 'nas':
			return {
				config: '/volume1/docker/cinephage/config',
				media: '/volume1/media',
				downloads: '/volume1/downloads'
			};
		case 'linux':
		default:
			return {
				config: './config',
				media: './media',
				downloads: './downloads'
			};
	}
}
