import { PlaneTakeoff } from "lucide-react";

const EmptyContent = () => {
	return (
		<div className="min-h-[80px] col-span-full flex items-center justify-center gap-4">
			<PlaneTakeoff />
			<span className="font-title text-zinc-400">See you later!</span>
		</div>
	);
};

export default EmptyContent;
