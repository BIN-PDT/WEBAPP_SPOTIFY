import { Loader } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AdminLoader = () => {
	return (
		<div className="h-screen w-full bg-black flex items-center justify-center">
			<Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
				<CardContent className="flex flex-col items-center gap-4 pt-6">
					<Loader className="size-10 text-emerald-500 animate-spin" />
					<h3 className="text-zinc-400 text-xl font-title">
						Authorizing you
					</h3>
					<p className="text-zinc-400 font-content italic">
						Redirecting...
					</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default AdminLoader;
