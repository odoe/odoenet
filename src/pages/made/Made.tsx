import { create, tsx } from '@dojo/framework/core/vdom';
import PageTemplate from '../../templates/page/Page';

import * as css from './Made.m.css';

const factory = create();

export default factory(function Home() {
	return (
		<div classes={[css.root]}>
			<PageTemplate page="made" />
		</div>
	);
});
