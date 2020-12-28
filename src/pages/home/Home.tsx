import { create, tsx } from '@dojo/framework/core/vdom';
import Avatar from '@dojo/widgets/avatar';
import has from '@dojo/framework/core/has';
import HomeTemplate from '../../templates/home/Home';

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
			<Avatar size="large" variant="circle" src={avatar} alt="odoenet" />
			<HomeTemplate />
		</section>
	);
});
