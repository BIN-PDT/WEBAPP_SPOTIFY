import { Ban } from "lucide-react";
import { Link } from "react-router";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Unauthorized = () => {
	return (
		<div className="h-screen w-full bg-black flex items-center justify-center">
			<Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
				<CardContent className="flex flex-col items-center gap-4 pt-6">
					<Ban className="size-10 text-red-500" />
					<div className="text-zinc-400 text-center">
						<h3 className="text-xl font-title">Unauthorized</h3>
						<p className="font-content text-base font-content italic">
							You do not have permission to access this page!
						</p>
					</div>

					<Link
						to="/"
						className={cn(
							buttonVariants({
								variant: "outline",
								className:
									"mt-5 px-10 hover:bg-zinc-800 font-title text-white",
							})
						)}
					>
						Home
					</Link>
				</CardContent>
			</Card>
		</div>
	);
};

export default Unauthorized;
