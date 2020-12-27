import { create, tsx } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';

import compile from '../../blocks/compile.block';

import * as css from './Home.m.css';

const factory = create({ block });

export default factory(function Home({ middleware: { block } }) {
	const home: any = block(compile)({ page: 'home', path: 'index.md' });

	return <div classes={[css.root]}>{home && home.content ? home.content : <span>Home content goes here</span>}</div>;
});
