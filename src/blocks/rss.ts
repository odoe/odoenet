// adapted from dojo blog https://github.com/dojo/site/blob/master/src/blog/rss.ts
import { DNode } from '@dojo/framework/core/interfaces';

import { Feed } from 'feed';
import { join } from 'path';
import { outputFileSync } from 'fs-extra';

const outputDirectory = join(__dirname, '../../output/dist');

export interface BlogEntry {
	title: string;
	author: string;
	link: string;
	image: string;
	description: string;
	content: DNode;
	date: Date;
}

// In order to not spam people's RSS feed when this goes live, we skip items before May 2019
const skipItemsBefore = new Date(2019, 4, 1).getTime();

export function createBlogFeed(files: any[]) {
	const feed = new Feed({
		title: 'odoenet',
		description: 'odoe network',
		id: 'https://odoe.net',
		link: 'https://odoe.net',
		favicon: 'https://odoe.net/favicon.ico',
		copyright: 'All rights reserved 2020, odoenet',
		feedLinks: {
			atom: 'https://odoe.net/atom',
		},
		author: {
			name: 'Rene Rubalcava',
		},
		feed: '',
	});

	for (const file of files) {
		const { content, description, title, author } = file.meta;
		const { sortDate } = file;
		const publishedDate = sortDate instanceof Date ? sortDate : new Date();

		if (publishedDate.getTime() < skipItemsBefore) {
			continue;
		}

		const url = `https://odoe.net/blog/${file.file.replace('.md', '')}`;
		const item = {
			title: typeof title === 'string' ? title : '',
			id: url,
			author: [{ name: typeof author === 'string' ? author : '' }],
			link: url,
			description: description,
			content: content,
			date: publishedDate,
			published: publishedDate,
		};

		// feed
		feed.addItem(item);
	}

	const feedOutputPath = join(outputDirectory, 'atom.xml');
	outputFileSync(feedOutputPath, feed.atom1());
}
