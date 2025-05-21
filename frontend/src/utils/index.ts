import { CloudMoon, CloudSun, Moon, Sun } from "lucide-react";
import toast from "react-hot-toast";

export function formatDuration(seconds: number) {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function formatTime(date: string) {
	return new Date(date).toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
}

export function getGreeting(): [React.ElementType, string] {
	const hour = new Date().getHours();
	if (hour >= 5 && hour < 12) return [Sun, "Good Morning"];
	if (hour >= 12 && hour < 18) return [CloudSun, "Good Afternoon"];
	if (hour >= 18 && hour < 22) return [CloudMoon, "Good Evening"];
	return [Moon, "Good Night"];
}

export function shuffle(items: any[]) {
	const array = [...items];
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export function toastSuccess(message: string) {
	toast.success(message, { className: "font-title" });
}

export function toastError(message: string) {
	toast.error(message, { className: "font-title" });
}

export function handleAPIError(error: any) {
	const message = error.response?.data.message;
	if (message) toastError(message);
}
