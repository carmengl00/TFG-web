import { capitalize as lodashCapitalize } from 'lodash';

export function startCase(text?: string): string {
	return text ? text.replace(/\S+/g, lodashCapitalize) : '';
}
