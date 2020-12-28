import { tsx, create } from '@dojo/framework/core/vdom';
import Outlet from '@dojo/framework/routing/Outlet';
import theme from '@dojo/framework/core/middleware/theme';
import dojo from '@dojo/widgets/theme/dojo';

import Blog from './pages/blog/Blog';
import Home from './pages/home/Home';
import BlogList from './templates/blog-list/BlogList';
import Made from './pages/made/Made';
import Uses from './pages/uses/Uses';

import Layout from './layouts/Layout';

import { AppProperties } from './interfaces';

const factory = create({ theme }).properties<AppProperties>();

export default factory(({ properties, middleware: { theme } }) => {
	if (!theme.get()) {
		theme.set(dojo);
	}
	const { siteMeta } = properties();
	return (
		<Layout {...siteMeta}>
			<Outlet
				id="main"
				matcher={(matches, matchMap) => {
					matches.list = matchMap.has('list') && matchMap.get('list')!.isExact();
					return matches;
				}}
			>
				{{
					list: <BlogList />,
					blog: ({ params: { path } }) => <Blog path={path} />,
					home: <Home />,
					made: <Made />,
					uses: <Uses />,
				}}
			</Outlet>
		</Layout>
	);
});
