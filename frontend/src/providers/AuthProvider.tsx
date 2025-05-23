import { Loader } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { attachAuthInterceptor, detachAuthInterceptor } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { handleAPIError } from "@/utils";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { isSignedIn, userId, getToken } = useAuth();
	const { checkAdminRole } = useAuthStore();
	const { initializeSocket, disconnectSocket } = useChatStore();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const interceptorId = attachAuthInterceptor(getToken);
		const abortController = new AbortController();

		async function initAuth() {
			try {
				if (isSignedIn) {
					await checkAdminRole(abortController.signal);
					if (userId) initializeSocket(userId);
				}
			} catch (error) {
				handleAPIError(error);
			} finally {
				setIsLoading(false);
			}
		}

		initAuth();

		return () => {
			detachAuthInterceptor(interceptorId);
			if (isSignedIn) {
				abortController.abort();
				disconnectSocket();
			}
		};
	}, [isSignedIn, userId]);

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
