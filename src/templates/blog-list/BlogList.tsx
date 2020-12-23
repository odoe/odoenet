import { tsx, create } from '@dojo/framework/core/vdom';
import block from '@dojo/framework/core/middleware/block';

import * as css from './BlogList.m.css';

import Card from '../../widgets/card/Card';
import compileBlogIndex from './blog-list.block';

import { meta } from '../../site-config';

const factory = create({ block });

export default factory(({ middleware: { block } }) => {
    const blogs = block(compileBlogIndex)({}) || [];
    // TODO: Add Search
    // TODO: Add Tag List
    return (
		<virtual>
			<head>
                <title>{meta.title}</title>
				<meta name="description" content={meta.description} />
			</head>
            <div classes={[css.root]}>
                {blogs.map((blog) => <Card key={blog.file} path={blog.file} {...blog.meta} />)}
            </div>
        </virtual>
    );
});
