import { create, tsx } from '@dojo/framework/core/vdom';
import MadeTemplate from '../../templates/made/Made';

import * as css from './Made.m.css';

const factory = create();

export default factory(function Home() {
	return (
		<div classes={[css.root]}>
			<MadeTemplate />
		</div>
	);
});
