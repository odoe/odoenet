import { create, tsx } from '@dojo/framework/core/vdom';
import has from '@dojo/framework/core/has';

import Embed from '../../widgets/embed/Embed';

const factory = create();

export default factory(function Home() {
    return (
        <section>
            <div>
                This is odoenet
                <Embed
                    url="https://player.twitch.tv"
                    options={{
                        channel: 'odoenet',
                        parent: has('production') ? 'odoenet.odoe.vercel.app' : 'localhost',
                        muted: 'true'
                    }}
                />
            </div>
        </section>
    );
});
