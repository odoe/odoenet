import { tsx, create } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';

import Link from '@dojo/framework/routing/Link';

import compile from './blog-post.block';

import Article from '../../widgets/article/Article';

import { dateFormatter } from '../../utils/formatter';

import { meta } from '../../site-config';

import * as css from './BlogPost.m.css';

export interface PostProperties {
	path: string;
}

const factory = create({ block }).properties<PostProperties>();

export default factory(({ middleware: { block }, properties }) => {
	let { path } = properties();
	if (!path.includes('.md')) {
		path = `${path}/index.md`;
	}
	const post = block(compile)({
		path,
	});

	if (post) {
		const date = dateFormatter(new Date(post.meta.date));
		return (
			<section classes={[css.root]}>
				<head>
					<meta name="title" content={post.meta.title} />
					<meta name="description" content={post.meta.description} />

					<meta property="og:type" content="website" />
					<meta property="og:url" content={post.meta.url} />
					<meta property="og:title" content={post.meta.title} />
					<meta property="og:description" content={post.meta.description} />
					<meta property="og:image" content={`${meta.rootUrl}${post.meta.coverImage}`} />

					<meta property="twitter:card" content="summary_large_image" />
					<meta property="twitter:url" content={post.meta.url} />
					<meta property="twitter:title" content={post.meta.title} />
					<meta property="twitter:description" content={post.meta.description} />
					<meta property="twitter:creator" content={meta.social} />
					<meta property="twitter:image" content={`${meta.rootUrl}${post.meta.coverImage}`} />

					<link
						rel="alternate"
						type="application/rss+xml"
						title="odoe.net"
						href="https://odoe.net/atom.xml"
					></link>
					<title>{post.meta.title}</title>
				</head>
				{post.meta.coverImage ? (
					<picture>
						<source
							type="image/webp"
							srcset={`${meta.rootUrl}${post.meta.coverImage.replace(/\.(jpg|png)/, '.webp')}`}
						/>
						<source type="image/jpeg" srcset={`${meta.rootUrl}${post.meta.coverImage}`} />
						<img
							src={post.meta.coverImage}
							key={`cover-image-${post.meta.title}`}
							alt={post.meta.title}
							loading="lazy"
						/>
					</picture>
				) : (
					[]
				)}
				<Article key={post.meta.title}>
					<Link
						to="blog"
						aria-label={post.meta.title}
						params={{
							path: path.replace('posts/', '').replace('index.md', ''),
						}}
					>
						<h2>{post.meta.title}</h2>
					</Link>
					<p>{`${post.meta.author} | ${date}`}</p>
					{post.content}
				</Article>
			</section>
		);
	}
});
