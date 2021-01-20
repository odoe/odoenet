interface FooterLink {
	href: string;
	text: string;
	logo?: string;
}

export interface SiteMeta {
	title: string;
	description: string;
	author: string;
	social: string;
	footerLinks: FooterLink[];
	rootUrl: string;
}
export interface AppProperties {
	siteMeta: SiteMeta;
}
