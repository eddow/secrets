type Dictionary<T = any> = {[key: string]: T};

function ajax<T>(method: string, url: string, data: Dictionary): Promise<T> {
	return new Promise<T>((resolve, reject) => {
		$.ajax('/api/'+url, {
			method,
			data
		}).done((arg: T)=> {
			if(globals.success) globals.success(arg);
			resolve(arg);
		}).fail((err: any)=> {
			if(globals.failure) globals.failure(err);
			reject(err);
		});
	});
}

export const globals = {
	success: <(...args: any[])=> void>null,
	failure: <(err: any)=> void>null
}

export function post<T>(url: string, data?: Dictionary): Promise<T> {
	return ajax('POST', url, data);
}

export function get<T>(url: string, data?: Dictionary): Promise<T> {
	return ajax('GET', url, data);
}