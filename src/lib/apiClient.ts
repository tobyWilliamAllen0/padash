import axios, { Method } from 'axios';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';

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
	const token = userProfile ? JSON.parse(userProfile)?.accessToken : '';

	if (token) {
		fetchOptions.headers['Authorization'] =
			'Bearer ' +
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2JjZGI3YWUzY2ZiNzBjOTE1NTU3YjYiLCJ1c2VybmFtZSI6IkFsaXJlemF0YWhhbmkiLCJtb2JpbGVOdW1iZXIiOiIwOTEyNjIxODAwMiIsInJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJpYXQiOjE3NDE3MjE0NzEsImV4cCI6MTc0MTgwNzg3MX0.b9b1J9HVo_VHpcrU07XeIdR3XMwDKVGOkwTL__d-Bgs';
	}
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
