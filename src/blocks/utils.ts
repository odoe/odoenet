/* eslint @typescript-eslint/no-var-requires: "off" */

import { resolve } from 'path';
import { readFile } from 'fs-extra';
import unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import raw from 'rehype-raw';
import toH from 'hast-to-hyperscript';
import frontmatter from 'remark-frontmatter';
import parseFrontmatter from 'remark-parse-yaml';
import { v } from '@dojo/framework/core/vdom';
import { remarkPlugins, rehypePlugins } from '../site-config';

// ---------------------------------------------------------------------------------------
// Based on https://github.com/dojo/site/blob/master/src/scripts/compile.ts
// ---------------------------------------------------------------------------------------

export const getLocalFile = async (path: string) => {
	path = resolve(__dirname, path);
	return await readFile(path, 'utf-8');
};

// Converts markdown to VNodes in hyperscript
export const toVNodes = (content: string) => {
	let counter = 0;
	let pipeline = unified().use(markdown).use(frontmatter, ['yaml']);

	// markdown plugins
	remarkPlugins.forEach(async (plugin: any) => {
		pipeline =
			typeof plugin === 'string'
				? pipeline.use(require(plugin))
				: pipeline.use(require(plugin.resolve), plugin.options);
	});

	// convert rehype
	pipeline = pipeline.use(remark2rehype, { allowDangerousHtml: true }).use(raw);

	// rehype plugins
	rehypePlugins.forEach((plugin: any) => {
		pipeline =
			typeof plugin === 'string'
				? pipeline.use(require(plugin))
				: pipeline.use(require(plugin.resolve), plugin.options);
	});

	const nodes = pipeline.parse(content);
	const node = pipeline.runSync(nodes);
	// add a root div with class name
	const rootDiv = {
		type: 'element',
		tagName: 'div',
		properties: { classes: 'md-content' },
		children: node.children
	};
	node.children = [rootDiv];
	return toH((tag: string, props: any, children: any[]) => v(tag, { ...props, key: counter++ }, children), node);
};

// Gets yaml metadata from markdown
export const getMetaData = (content: string) => {
	const pipeline = unified().use(markdown).use(frontmatter, ['yaml']).use(parseFrontmatter);

	const nodes = pipeline.parse(content);
	const result: any = pipeline.runSync(nodes);
	const node = result.children.find((child: any) => Boolean(child.type === 'yaml'));
	return node ? node.data.parsedValue : {};
};

// helpers
export const coverImageHelper = (meta: any, filePath: string) => {
	if (!meta.coverImage) {
		meta.coverImage = `/assets/logo.png`;
	} else {
		if (!filePath.endsWith('/')) {
			filePath = `${filePath}/`;
		}
		meta.coverImage = `/assets/blog/${filePath}images/${meta.coverImage}`;
	}
	return meta;
};
