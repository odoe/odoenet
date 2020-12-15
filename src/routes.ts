export default [
	{
		id: 'home',
		path: '/',
		outlet: 'main',
		defaultRoute: true
	},
	{
		id: 'list',
		path: 'blog',
		outlet: 'main'
	},
	{
		id: 'blog',
		path: 'blog/{path}',
		outlet: 'main'
	}
];