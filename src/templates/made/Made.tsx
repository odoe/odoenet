import { create, tsx } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';

import compile from '../../blocks/compile.block';

import * as css from './Made.m.css';

const factory = create({ block });

export default factory(function Made({ middleware: { block } }) {

    const page: any = block(compile)({ page: 'made', path: 'index.md' });

    if (page) {
        return (
            <div classes={[css.root]}>
                <head>
                    <title>{page.meta.title}</title>
                    <meta name="description" content={page.meta.description} />
                </head>
                {page.content}
            </div>
        )
    }
});
