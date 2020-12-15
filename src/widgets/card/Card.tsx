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
}

const factory = create().properties<CardProperties>();

export default factory(({ properties }) => {
  const { title, date, description, path, coverImage } = properties();
  const key = `post-${title.replace(' ', '-')}`;
  return (
    <section classes={[ css.root ]} key={key}>
      <div classes={[ css.column ]}>
        <Link
          classes={[css.link]}
          to="blog"
          params={{
            path: path.replace('posts/', '').replace('index.md', '')
          }}
        >
          {title}
        </Link>
        <p>{dateFormatter(new Date(date))}</p>
        <span>{description}</span>
      </div>
      <div classes={[ css.column ]}>
        <Link
          classes={[css.link]}
          to="blog"
          aria-label={description}
          params={{
            path: path.replace('posts/', '').replace('index.md', '')
          }}
        >
          {
            coverImage ?
            (
              <picture>
                <source type="image/webp" srcset={coverImage.replace(/\.(jpg|png)/, '.webp')}/>
                <source type="image/jpeg" srcset={coverImage}/>
                <img alt={description} loading="lazy" classes={[ css.image ]} src={coverImage} />
              </picture>
            )
            :
            []
          }
        </Link>
      </div>
    </section>
  );
});
