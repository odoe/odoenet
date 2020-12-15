import { join } from 'canonical-path';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import { getLocalFile, getMetaData, toVNodes } from './utils';

const CONTENT_PATH = join(__dirname, '../../posts');

export default async function({ path }: { path: string }) {
	const contentPath = join(CONTENT_PATH, path);
	// TODO: add option to return excerpt from blog post
	// raw content
	// rawContent = rawContent.split('<!-- more -->')[0];

	let file = await getLocalFile(contentPath);
	file = file.replace(/images\//gi, `/assets/blog/${path.replace('index.md', '')}/images/`);
	await imagemin([`/assets/blog/${path.replace('index.md', '')}/images/*.{jpg,png}`], {
		destination: `/assets/blog/${path.replace('index.md', '')}/images/}`,
		plugins: [
			imageminWebp()
		]
	});
	const content = toVNodes(file);
	const meta = await getMetaData(file);
	meta.coverImage = `/assets/blog/${path.replace('index.md', '')}/images/${meta.coverImage}`;
	return { content, meta };
}
