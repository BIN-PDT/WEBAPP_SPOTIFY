import axios from "axios";
import settings from "./settings";

export const axiosInstance = axios.create({
	baseURL: settings.BACKEND_URL,
	withCredentials: true,
});

export function attachAuthInterceptor(getToken: () => Promise<string | null>) {
	return axiosInstance.interceptors.request.use(
		async (config) => {
			const token = await getToken();
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		(error) => Promise.reject(error)
	);
}

export function detachAuthInterceptor(id: number) {
	axiosInstance.interceptors.request.eject(id);
}
