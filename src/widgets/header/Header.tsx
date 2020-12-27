import { tsx, create } from '@dojo/framework/core/vdom';

import Link from '@dojo/framework/routing/Link';

import * as css from './Header.m.css';

const factory = create().properties<{ title: string }>();

export default factory(({ properties }) => {
	const { title } = properties() || 'My Site';
	return (
		<header classes={[css.root]}>
			<div classes={[css.title]}>
				<Link to="/" isOutlet={false} classes={[css.link]}>
					{title}
				</Link>
			</div>
			<div classes={[css.title]}>
				<Link to="/blog" isOutlet={false} classes={[css.link]}>
					blog
				</Link>
			</div>
			<div classes={[css.title]}>
				<Link to="/made" isOutlet={false} classes={[css.link]}>
					made
				</Link>
			</div>
			<div classes={[css.title]}>
				<Link to="/uses" isOutlet={false} classes={[css.link]}>
					uses
				</Link>
			</div>
		</header>
	);
});
