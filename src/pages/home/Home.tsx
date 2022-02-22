import { create, tsx } from '@dojo/framework/core/vdom';
import Avatar from '@dojo/widgets/avatar';
import has from '@dojo/framework/core/has';
import PageTemplate from '../../templates/page/Page';

import Embed from '../../widgets/embed/Embed';

import * as css from './Home.m.css';

import avatar from './avatar.jpg';

const factory = create();

export default factory(function Home() {
	return (
		<section classes={[css.root]}>
			<Embed
				url="https://player.twitch.tv"
				options={{
					channel: 'odoenet',
					parent: has('production') ? 'odoe.net' : 'localhost',
					muted: 'true',
				}}
			/>
			<Avatar size="large" variant="default" src={avatar} alt="odoenet" />
			<PageTemplate page="home" />
		</section>
	);
});
