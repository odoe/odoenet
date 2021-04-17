import { create, tsx } from '@dojo/framework/core/vdom';
import PageTemplate from '../../templates/page/Page';

import * as css from './Tips.m.css';

const factory = create();

export default factory(function Tips() {
	return (
		<div classes={[css.root]}>
			<PageTemplate page="tips" />
		</div>
	);
});
