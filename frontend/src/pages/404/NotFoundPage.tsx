import { Music2 } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
	const navigate = useNavigate();

	return (
		<main className="h-full bg-neutral-900 flex items-center justify-center">
			<div className="text-center space-y-8 px-4">
				<div className="flex justify-center animate-bounce">
					<Music2 className="size-24 text-emerald-500" />
				</div>
				{/* ERROR MESSAGE */}
				<div className="space-y-4">
					<h1 className="text-7xl font-header text-white">404</h1>
					<h2 className="text-2xl font-title text-white">
						Page not found
					</h2>
					<p className="font-content text-neutral-400 italic max-w-md mx-auto">
						Looks like this track got lost in the shuffle. Let's get
						you back to the music!
					</p>
				</div>
				{/* ACTION BUTTON */}
				<div className="flex justify-center items-center mt-8">
					<Button
						onClick={() => navigate(-1)}
						variant="outline"
						className="font-title bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-700 w-full"
					>
						Go Back
					</Button>
				</div>
			</div>
		</main>
	);
};

export default NotFoundPage;
