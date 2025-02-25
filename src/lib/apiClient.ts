import axios, { Method } from 'axios';
import { parseCookies } from 'nookies';

function formatUrl(path: string) {
	const adjustedPath = path[0] !== '/' ? `/${path}` : path;
	return 'https://api.padash-campaign.com' + adjustedPath;
	// return adjustedPath
}

async function checkStatus(response: Response) {
	if (response.status >= 200 && response.status < 300) {
		return parseJSON(response);
	}

	return Promise.reject(await response.text());
}

async function parseJSON(response: Response) {
	if (response && response.headers) {
		if (response.headers.get('Content-Type') === 'application/json') {
			return await response.json();
		}
		if (response.headers.get('Content-Type') === 'text/plain;charset=UTF-8') {
			return await response.text();
		}
	}
	return response;
}
interface Options extends RequestInit {
	type?: 'formdata' | undefined;
	data?: any;
	headers?: any;
	method: Method;
}
async function ApiClient(path: string, options: any) {
	const url = formatUrl(path);
	const fetchOptions = options;

	fetchOptions.headers = fetchOptions.headers || {};

	const userProfile = parseCookies()['userProfile'];
	const token = JSON.parse(userProfile)?.accessToken;

	console.log(JSON.parse(userProfile), token);

	fetchOptions.headers['Authorization'] = 'Bearer ' + token;
	if (fetchOptions.type === 'formdata') {
		fetchOptions.body = new FormData();

		for (const key in options.data) {
			if (
				typeof key === 'string' &&
				options.data.hasOwnProperty(key) &&
				typeof options.data[key] !== 'undefined'
			) {
				fetchOptions.body.append(key, options.data[key]);
			}
		}
	} else {
		fetchOptions.body = JSON.stringify(options.data);
		fetchOptions.headers['Accept'] = 'application/json';
	}

	return axios({ url, ...options });
}
export default ApiClient;
