import { useReducer } from 'react';
import ApiClient from '../lib/apiClient';
import { Method } from 'axios';
import { toast } from 'react-toastify';

interface State {
	isLoading: boolean;
	isSucceed: boolean;
	isFailed: boolean;
	error: unknown;
	response: any;
}

interface Action {
	type: 'FETCH_INIT' | 'FETCH_SUCCESS' | 'FETCH_FAILURE';
	payload?: unknown;
}
interface UseFetchAction {
	onSuccess?: (res: unknown) => void;
	onError?: (error: unknown) => void;
}
interface Options extends RequestInit {
	type?: 'formdata' | undefined;
	data?: unknown;
	headers?: any;
	url: string;
	method: Method;
}

const dataFetchReducer = (state: State, action: Action) => {
	switch (action.type) {
		case 'FETCH_INIT':
			return {
				...state,
				isLoading: true,
				isSucceed: false,
				isFailed: false,
				error: null,
				response: null,
			};
		case 'FETCH_SUCCESS':
			return {
				...state,
				isLoading: false,
				isSucceed: true,
				isFailed: false,
				error: null,
				response: action.payload,
			};
		case 'FETCH_FAILURE':
			return {
				...state,
				isLoading: false,
				isSucceed: false,
				isFailed: true,
				error: action.payload,
				response: null,
			};
		default:
			return state;
	}
};

function useFetch(
	action?: UseFetchAction,
): [State, (options: Options) => Promise<unknown>] {
	const [state, dispatch] = useReducer(dataFetchReducer, {
		isLoading: false,
		isSucceed: false,
		isFailed: false,
		error: null,
		response: null,
	});

	async function performAction({ url, ...options }: Options) {
		try {
			dispatch({ type: 'FETCH_INIT' });
			const res = await ApiClient(url, options);
			action && action.onSuccess && action.onSuccess(res.data.result);
			dispatch({ type: 'FETCH_SUCCESS', payload: res.data.result });
		} catch (e: any) {
			if (e?.response?.data?.message !== "عضویت شما در این کانال پیدا نشد")  {
				toast.error(
					e?.response?.data?.message ?? 'متاسفانه مشکلی به وجود آمده است',
				);
			}
			
			action && action.onError && action.onError(e);
			dispatch({ type: 'FETCH_FAILURE', payload: e });
		}
	}

	return [state, performAction];
}
export default useFetch;
