export function verifyYouTubeUrl(string: string): boolean {
	const standardURL = /^https:\/\/youtu\.be\/.+$/;
	return standardURL.test(string);
}
