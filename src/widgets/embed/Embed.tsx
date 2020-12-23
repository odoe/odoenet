import { create, tsx } from '@dojo/framework/core/vdom';

import { toURLParams } from '../../utils/urlParams';

interface EmbedProperties {
    url: string;
    options: { [k: string]: string }
}

const factory = create().properties<EmbedProperties>();

export default factory(function Embed({ properties }) {
    const { url, options } = properties();
    const params = toURLParams(options);

    return (
        <iframe
            src={`${url}/?${params}`}
            height="300"
            width="450"
            frameborder="0"
            scrolling="no"
            allowfullscreen="true">
        </iframe>
    );
});
