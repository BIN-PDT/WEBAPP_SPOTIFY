import { getGreeting } from "@/utils";

const Greeting = () => {
	const [Icon, greeting] = getGreeting();

	return (
		<h1 className="text-2xl sm:text-3xl font-header mb-6 flex items-center gap-2">
			<Icon />
			{greeting}
		</h1>
	);
};

export default Greeting;
