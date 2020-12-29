import { tsx, create } from '@dojo/framework/core/vdom';
import Link from '@dojo/framework/routing/Link';

import { dateFormatter } from '../../utils/formatter';

import * as css from './Card.m.css';

interface CardProperties {
	author?: string;
	title: string;
	date: string;
	description: string;
	coverImage: string;
	path: string;
	tags: string;
}

const factory = create().properties<CardProperties>();

export default factory(({ properties }) => {
	const { title, date, description, path, coverImage, tags = '' } = properties();
	const key = `post-${title.replace(' ', '-')}`;
	const taglist = tags.split(',').map(a => a.trim());
	const tagitems = taglist.sort().map(a => ({
		tag: a,
		img: tagImage(a)
	})).filter(a => Boolean(a.img));
	return (
		<section classes={[css.root]} key={key}>
			<div classes={[css.column]}>
				<Link
					classes={[css.link]}
					to="blog"
					aria-label={description}
					params={{
						path: path.replace('posts/', '').replace('index.md', ''),
					}}
				>
					<div classes={[css.content]}>
						{coverImage ? (
							<picture>
								<source type="image/webp" srcset={coverImage.replace(/\.(jpg|png)/, '.webp')} />
								<source type="image/jpeg" srcset={coverImage} />
								<img alt={description} loading="lazy" classes={[css.image]} src={coverImage} />
							</picture>
						) : (
							[]
						)}
						<span classes={[css.banner]}>{title}</span>
						<span classes={[css.date]}>
							<small>{dateFormatter(new Date(date))}</small>
						</span>
					</div>
					<div classes={[css.tags]}>
							{
								tagitems.map(a => (
									<img classes={[css.tag]} src={a.img} alt={a.tag} title={a.tag} />
								))
							}
					</div>
				</Link>
			</div>
		</section>
	);
});

function tagImage(type: string) {
	if (type === 'geodev') {
		return './assets/images/logos/globe-icon.png';
	}
	else if (type === 'typescript') {
		return './assets/images/logos/ts-logo.png';
	}
	else if (type === 'dojo') {
		return './assets/images/logos/dojo-logo.png';
	}
}
