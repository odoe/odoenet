import { tsx, create } from '@dojo/framework/core/vdom';

import Footer from '../widgets/footer/Footer';
import Header from '../widgets/header/Header';

import * as css from './Layout.m.css';

import { SiteMeta } from '../interfaces';

const factory = create().properties<SiteMeta>();

export default factory(({ children, properties }) => {
	const { title, author, footerLinks } = properties();

	return (
		<div>
			<head>
				<meta charset="utf-8" />
				<meta name="theme-color" content="#009dff" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/assets/favicon.ico" />
				<link rel="preconnect" href="https://www.google-analytics.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&display=swap"
					rel="stylesheet"
				/>
				<link
					rel="alternate"
					type="application/rss+xml"
					title="odoe.net"
					href="https://odoe.net/atom.xml"
				></link>
			</head>
			<Header title={title} />
			<div classes={[css.root]}>
				<main classes={[css.section]}>{children()}</main>
			</div>
			<Footer {...{ author, footerLinks }} />
		</div>
	);
});
