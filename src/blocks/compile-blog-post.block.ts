import { join } from 'canonical-path';
// import imagemin from 'imagemin';
// import imageminWebp from 'imagemin-webp';
import { getLocalFile, getMetaData, toVNodes } from './utils';

const CONTENT_PATH = join(__dirname, '../../posts');

export default async function({ path }: { path: string }) {
	try {
		const contentPath = join(CONTENT_PATH, path);
		let file = await getLocalFile(contentPath);
		file = file.replace(/images\//gi, `/assets/blog/${path.replace('index.md', '')}/images/`);
		const content = toVNodes(file);
		const meta = await getMetaData(file);
		meta.coverImage = `/assets/blog/${path.replace('index.md', '')}/images/${meta.coverImage}`;
		return { content, meta };
	}
	catch(error) {
		console.log(error.message);
		return null;
	}
}
