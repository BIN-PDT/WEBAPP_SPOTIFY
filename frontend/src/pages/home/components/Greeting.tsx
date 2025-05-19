import { getGreeting } from "@/utils";
import { CloudMoon, CloudSun, Moon, Sun } from "lucide-react";

const Greeting = () => {
	const [type, greeting] = getGreeting();
	let icon = null;
	switch (type) {
		case 1:
			icon = <Sun />;
			break;
		case 2:
			icon = <CloudSun />;
			break;
		case 3:
			icon = <CloudMoon />;
			break;
		case 4:
			icon = <Moon />;
			break;
	}

	return (
		<h1 className="text-2xl sm:text-3xl font-header mb-6 flex items-center gap-2">
			{icon}
			{greeting}
		</h1>
	);
};

export default Greeting;
