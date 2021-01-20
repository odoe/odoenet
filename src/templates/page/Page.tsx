import { create, tsx } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';

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
					<title>{data.meta.title}</title>
					<meta name="description" content={data.meta.description} />
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
