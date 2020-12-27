import { tsx, create } from '@dojo/framework/core/vdom';
import Post from '../../templates/blog-post/BlogPost';
import SignUp from '../../widgets/signup/SignUp';

import * as css from './Blog.m.css';

const factory = create().properties<{ path: string }>();

export default factory(({ properties }) => {
	const { path } = properties();

	return (
		<div classes={[css.root]}>
			<Post key={path} path={path} />
			<SignUp />
		</div>
	);
});
