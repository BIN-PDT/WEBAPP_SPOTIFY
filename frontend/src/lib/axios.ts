import axios from "axios";
import settings from "./settings";

export const axiosInstance = axios.create({
	baseURL: settings.BACKEND_URL,
	withCredentials: true,
});
