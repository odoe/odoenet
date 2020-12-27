import { create, tsx } from '@dojo/framework/core/vdom';
import has from '@dojo/framework/core/has';
import HomeTemplate from '../../templates/home/Home';

import Embed from '../../widgets/embed/Embed';

import * as css from './Home.m.css';

const factory = create();

export default factory(function Home() {
    return (
        <section classes={[ css.root ]}>
            <Embed
                url="https://player.twitch.tv"
                options={{
                    channel: 'odoenet',
                    parent: has('production') ? 'odoenet.odoe.vercel.app' : 'localhost',
                    muted: 'true'
                }}
            />
            <HomeTemplate />
        </section>
    );
});
