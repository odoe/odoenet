import { join } from 'canonical-path';
import { readdir } from 'fs-extra';

import { getLocalFile, getMetaData, coverImageHelper } from '../../blocks-common/utils';
import { createBlogFeed } from '../../blocks-common/rss';

const CONTENT_PATH = join(__dirname, '../../../markdown-pages/blog');
// https://github.com/dojo/site/blob/master/src/scripts/compile-blog-index.block.ts
export default async function (options: any) {
	let files: string[] = [];
	try {
		files = await readdir(CONTENT_PATH);
	}
	catch(error) {
		// do nothing
		console.log('error loading file', error.message);
		files = [];
	}
	const blogs: any[] = [];
	for (let file of files) {
		const filePath = join(CONTENT_PATH, file, 'index.md');
		try {
			const content = await getLocalFile(filePath);
			const meta = coverImageHelper(getMetaData(content), file);

			if (meta.published) {
				blogs.push({
					sortDate: new Date(`${meta.date}`),
					file,
					meta
				});
			}
		}
		catch (error) {
			console.log('compile-blog-index', error.message);
		}
	}

	createBlogFeed(blogs);

	return blogs.sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime());
}
