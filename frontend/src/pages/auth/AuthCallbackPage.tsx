import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@clerk/clerk-react";
import { axiosInstance } from "@/lib/axios";
import { handleAPIError } from "@/utils";

const AuthCallbackPage = () => {
	const navigate = useNavigate();
	const { isLoaded, user } = useUser();

	useEffect(() => {
		async function syncUser() {
			try {
				if (!isLoaded || !user) return;
				await axiosInstance.post("/auth/callback", {
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					imageUrl: user.imageUrl,
				});
			} catch (error) {
				handleAPIError(error);
			} finally {
				navigate("/");
			}
		}

		syncUser();
	}, [isLoaded, user]);

	return (
		<div className="h-screen w-full bg-black flex items-center justify-center">
			<Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
				<CardContent className="flex flex-col items-center gap-4 pt-6">
					<Loader className="size-10 text-emerald-500 animate-spin" />
					<h3 className="text-zinc-400 text-xl font-title">
						Logging you in
					</h3>
					<p className="text-zinc-400 font-content italic">
						Redirecting...
					</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default AuthCallbackPage;
