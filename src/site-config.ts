import { SiteMeta } from './interfaces';

export const meta: SiteMeta = {
	title: 'odoenet',
	author: 'Rene Rubalcava',
	description: 'The odoe network',
	social: '@odoenet',
	rootUrl: 'https://odoe.net',
	footerLinks: [
		{
			href: 'https://odoe.net/atom.xml',
			text: 'rss feed',
			logo: '/assets/images/logos/rss-logo-32px.png',
		},
		{
			href: 'https://github.com/odoe/odoenet',
			text: 'github',
			logo: '/assets/images/logos/GitHub-Mark-32px.png',
		},
		{
			href: 'https://www.youtube.com/c/ReneRubalcava',
			text: 'youtube',
			logo: '/assets/images/logos/yt_logo_mono_light_32px.png',
		},
		{
			href: 'https://dojo.io/',
			text: 'powered by @dojo',
		},
	],
};

// -------------------------------------
// Plugins for static site generation
// -------------------------------------

// remark plugins with options
export const remarkPlugins = [
	'remark-gfm',
	'remark-slug',
	{
		resolve: 'remark-external-links',
		options: { target: '_blank', rel: ['nofollow'] },
	},
];

// rehype plugins with options
export const rehypePlugins = [
	{
		resolve: 'rehype-picture',
		options: {
			jpg: {
				webp: 'image/webp',
			},
			png: {
				webp: 'image/webp',
			},
		},
	},
	'@mapbox/rehype-prism',
];
