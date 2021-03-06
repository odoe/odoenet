import 'regenerator-runtime/runtime';
import { join } from 'canonical-path';
import { getLocalFile, getMetaData, toVNodes, coverImageHelper } from '../../blocks/utils';

const CONTENT_PATH = join(__dirname, '../../../markdown-pages/blog');

export default async function ({ path }: { path: string }) {
	const contentPath = join(CONTENT_PATH, path);
	let file: any;
	try {
		file = await getLocalFile(contentPath);
	} catch (error) {
		console.log('error: compile post - ', error.message);
		return null;
	}
	const meta = coverImageHelper(getMetaData(file), path.replace('index.md', ''));
	file = file.replace(/images\//gi, `/assets/blog/${path.replace('index.md', '')}/images/`);
	const content = toVNodes(file);
	return { content, meta };
}
