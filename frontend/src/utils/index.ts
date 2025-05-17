export function formatDuration(seconds: number) {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function getGreeting() {
	const hour = new Date().getHours();
	if (hour >= 5 && hour < 12) return "Good Morning";
	if (hour >= 12 && hour < 18) return "Good Afternoon";
	if (hour >= 18 && hour < 22) return "Good Evening";
	return "Good Night";
}
