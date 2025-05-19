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

export function shuffle(items: any[]) {
	const array = [...items];
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}
