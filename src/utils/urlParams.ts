export function toURLParams(params: any) {
	return Object.keys(params)
		.map((key) => {
			return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
		})
		.join('&');
}
