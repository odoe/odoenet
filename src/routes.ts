export default [
	{
		id: 'list',
		path: '/',
		outlet: 'main',
		defaultRoute: true
	},
	{
		id: 'blog',
		path: 'blog/{path}',
		outlet: 'main'
	}
];