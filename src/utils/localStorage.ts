export function set(keyName: string, keyValue: string[] | string) {
	localStorage.setItem(keyName, JSON.stringify(keyValue));
}

export function get(
	keyName: string,
	createIfNotExists: boolean = false,
): string[] | string {
	let exists: string | null = localStorage.getItem(keyName);

	if (createIfNotExists) {
		if (!exists) {
			localStorage.setItem(keyName, '');
			exists = localStorage.getItem(keyName);
		}
	}

	return JSON.parse(exists!);
}
