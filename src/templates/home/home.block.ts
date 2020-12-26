import 'regenerator-runtime/runtime';
import { join } from 'canonical-path';
import { getLocalFile, getMetaData, toVNodes } from '../../blocks/utils';

const CONTENT_PATH = join(__dirname, '../../../markdown-pages/');

export default async function({ page, path = 'index.md' }: { page: string, path: string }) {
	const contentPath = join(CONTENT_PATH, page, path);
	let file: any;
	try {
		file = await getLocalFile(contentPath);
	}
	catch(error) {
		console.log('error: compile post - ', error.message);
		return null;
	}
	const meta = getMetaData(file);
	if (!meta.coverImage) {
		meta.coverImage = `/assets/logo.png`
	}
	else {
		meta.coverImage = `/assets/home/images/${meta.coverImage}`;
	}
	file = file.replace(/images\//gi, `/assets/${page}/images/`);
	file = file.replace(/images\//gi, `/assets/${page}/${path.replace('index.md', '')}/images/`);
	const content = toVNodes(file);
	return { content, meta };
}
