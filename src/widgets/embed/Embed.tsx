import { create, tsx } from '@dojo/framework/core/vdom';

import { toURLParams } from '../../utils/urlParams';

import * as css from './Embed.m.css';

interface EmbedProperties {
	url: string;
	options: { [k: string]: string };
}

const factory = create().properties<EmbedProperties>();

export default factory(function Embed({ properties }) {
	const { url, options } = properties();
	const params = toURLParams(options);

	return (
		<iframe
			classes={[css.root]}
			src={`${url}/?${params}`}
			width="100%"
			frameborder="0"
			scrolling="no"
			allowfullscreen="true"
		></iframe>
	);
});
