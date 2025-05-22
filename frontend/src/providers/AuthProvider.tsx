import { Loader } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { handleAPIError } from "@/utils";
import { useChatStore } from "@/stores/useChatStore";

function updateAPIToken(token: string | null): void {
	if (token) {
		axiosInstance.defaults.headers.common[
			"Authorization"
		] = `Bearer ${token}`;
	} else {
		delete axiosInstance.defaults.headers.common["Authorization"];
	}
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { userId, getToken } = useAuth();
	const [isLoading, setIsLoading] = useState(true);
	const { checkAdminRole } = useAuthStore();
	const { initializeSocket, disconnectSocket } = useChatStore();

	useEffect(() => {
		const abortController = new AbortController();

		async function initAuth() {
			try {
				const token = await getToken();
				updateAPIToken(token);

				if (token) {
					await checkAdminRole(abortController.signal);
					if (userId) initializeSocket(userId);
				}
			} catch (error) {
				handleAPIError(error);
				updateAPIToken(null);
			} finally {
				setIsLoading(false);
			}
		}

		initAuth();

		return () => {
			abortController.abort();
			disconnectSocket();
		};
	}, [userId]);

	if (isLoading) {
		return (
			<div className="h-screen w-full flex items-center justify-center">
				<Loader className="size-14 text-emerald-500 animate-spin" />
			</div>
		);
	}
	return children;
};

export default AuthProvider;
