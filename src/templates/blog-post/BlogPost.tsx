import { tsx, create } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';

import Link from '@dojo/framework/routing/Link';

import compile from './blog-post.block';

import Article from '../../widgets/article/Article';

import { dateFormatter } from '../../utils/formatter';

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
	const post: any = block(compile)({
		path,
	});

	if (post) {
		const date = dateFormatter(new Date(post.meta.date));
		return (
			<section classes={[css.root]}>
				<head>
					<title>{post.meta.title}</title>
					<meta name="description" content={post.meta.description} />
				</head>
				{post.meta.coverImage ? (
					<picture>
						<source type="image/webp" srcset={post.meta.coverImage.replace(/\.(jpg|png)/, '.webp')} />
						<source type="image/jpeg" srcset={post.meta.coverImage} />
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
