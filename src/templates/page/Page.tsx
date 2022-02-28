import { create, tsx } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';

import { meta } from '../../site-config';

import compile from '../../blocks/compile.block';

import * as css from './Page.m.css';

interface PageProperties {
	page: string;
	path?: string;
	showCoverImage?: boolean;
}

const factory = create({ block }).properties<PageProperties>();

export default factory(function Page({ middleware: { block }, properties }) {
	const { page, path = 'index.md', showCoverImage } = properties();
	const data = block(compile)({ page, path });

	if (data) {
		return (
			<div classes={[css.root]}>
				<head>
					<meta name="title" content={data.meta.title} />
					<meta name="description" content={data.meta.description} />

					<meta property="og:type" content="website" />
					<meta property="og:url" content={data.meta.url} />
					<meta property="og:title" content={data.meta.title} />
					<meta property="og:description" content={data.meta.description} />
					{data.meta.coverImage ? <meta property="og:image" content={`${meta.rootUrl}${data.meta.coverImage}`} /> : null}
					

					<meta property="twitter:card" content="summary_large_image" />
					<meta property="twitter:url" content={data.meta.url} />
					<meta property="twitter:title" content={data.meta.title} />
					<meta property="twitter:description" content={data.meta.description} />
					<meta property="twitter:creator" content={meta.social} />
					{data.meta.coverImage ? <meta property="twitter:image" content={`${meta.rootUrl}${data.meta.coverImage}`} /> : null}
					<title>{data.meta.title}</title>
				</head>
				{showCoverImage && data.meta.coverImage ? (
					<picture>
						<source type="image/webp" srcset={data.meta.coverImage.replace(/\.(jpg|png)/, '.webp')} />
						<source type="image/jpeg" srcset={data.meta.coverImage} />
						<img
							src={data.meta.coverImage}
							key={`cover-image-${data.meta.title}`}
							alt={data.meta.title}
							loading="lazy"
						/>
					</picture>
				) : (
					[]
				)}
				{data.content}
			</div>
		);
	}
});
