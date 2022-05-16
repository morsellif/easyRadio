export function set(keyName: string, keyValue: Array<any> | string) {
	localStorage.setItem(keyName, JSON.stringify(keyValue));
}

export function get(keyName: string, createIfNotExists: boolean = false) {
	let exists: string | null = localStorage.getItem(keyName);

	if (createIfNotExists) {
		if (!exists) {
			localStorage.set(keyName, '');
			exists = localStorage.getItem(keyName);
		}
	}
}
