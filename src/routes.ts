export default [
	{
		id: 'home',
		path: '/',
		outlet: 'main',
		defaultRoute: true,
	},
	{
		id: 'list',
		path: 'blog',
		outlet: 'main',
	},
	{
		id: 'blog',
		path: 'blog/{path}',
		outlet: 'main',
	},
	{
		id: 'made',
		path: 'made',
		outlet: 'main',
	},
	{
		id: 'uses',
		path: 'uses',
		outlet: 'main',
	},
	{
		id: 'tips',
		path: 'tips',
		outlet: 'main',
	},
	{
		id: 'podcast',
		path: 'podcast',
		outlet: 'main',
	},
];
