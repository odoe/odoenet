import 'regenerator-runtime/runtime';
import { join } from 'canonical-path';
import { getLocalFile, getMetaData, toVNodes, coverImageHelper } from './utils';

const CONTENT_PATH = join(__dirname, '../../posts');

export default async function({ path }: { path: string }) {
	try {
		const contentPath = join(CONTENT_PATH, path);
		let file = await getLocalFile(contentPath);
		const meta = coverImageHelper(getMetaData(file), path.replace('index.md', ''));
		file = file.replace(/images\//gi, `/assets/blog/${path.replace('index.md', '')}/images/`);
		const content = toVNodes(file);
		return { content, meta };
	}
	catch(error) {
		console.log('error: compile post - ', error.message);
		return null;
	}
}
