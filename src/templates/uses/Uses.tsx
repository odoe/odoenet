import { create, tsx } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';

import compile from '../../blocks/compile.block';

import * as css from './Uses.m.css';

const factory = create({ block });

export default factory(function Home({ middleware: { block } }) {

    const page: any = block(compile)({ page: 'uses', path: 'index.md' });

    if (page) {
        return (
            <div classes={[css.root]}>
                <head>
                    <title>{page.meta.title}</title>
                    <meta name="description" content={page.meta.description} />
                </head>
				{
					page.meta.coverImage ?
					(
						<picture>
							<source type="image/webp" srcset={page.meta.coverImage.replace(/\.(jpg|png)/, '.webp')}/>
							<source type="image/jpeg" srcset={page.meta.coverImage}/>
							<img src={page.meta.coverImage} key={`cover-image-${page.meta.title}`} alt={page.meta.title} loading="lazy" />
						</picture>
					)
					:
					[]
				}
                {page.content}
            </div>
        )
    }
});
