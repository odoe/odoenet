import 'regenerator-runtime/runtime';
import { join } from 'canonical-path';
import { getLocalFile, getMetaData, toVNodes } from './utils';

const CONTENT_PATH = join(__dirname, '../../markdown-pages');

export default async function compile({ page, path }: { page: string; path: string }) {
	const contentPath = join(CONTENT_PATH, page, path);
	let file: string;
	try {
		file = await getLocalFile(contentPath);
	} catch (error) {
		console.log('error: compile post - ', error.message);
		return null;
	}
	const meta = getMetaData(file);
	if (!meta.url && page !== 'home') {
		meta.url = `https://odoe.net/${page}`;
	}
	if (!meta.coverImage) {
		meta.coverImage = `/assets/logo.png`;
	} else {
		meta.coverImage = `/assets/${page}/images/${meta.coverImage}`;
	}
	file = file.replace(/images\//gi, `/assets/${page}/images/`);
	const content = toVNodes(file);
	return { content, meta };
}
