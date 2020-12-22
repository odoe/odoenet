import 'regenerator-runtime/runtime';
import { join } from 'canonical-path';
import { getLocalFile, getMetaData, toVNodes, coverImageHelper } from './utils';

const CONTENT_PATH = join(__dirname, '../../posts');

export default async function({ path }: { path: string }) {
	const contentPath = join(CONTENT_PATH, path);
	let file: any;
	try {
		file = await getLocalFile(contentPath);
	}
	catch(error) {
		console.log('error: compile post - ', error.message);
		return null;
	}
	const meta = coverImageHelper(getMetaData(file), path.replace('index.md', ''));
	file = file.replace(/images\//gi, `/assets/blog/${path.replace('index.md', '')}/images/`);
	const content = toVNodes(file);
	// console.log('vnode iframe?', JSON.stringify(content).includes('iframe'));
	console.log(meta.title);
	return { content, meta };
}
