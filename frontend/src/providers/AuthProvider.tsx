import { Loader } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";

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
	const { getToken } = useAuth();
	const { checkAdminRole } = useAuthStore();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function initAuth() {
			try {
				const token = await getToken();
				updateAPIToken(token);
				if (token) await checkAdminRole();
			} catch (error) {
				console.log(error);
				updateAPIToken(null);
			} finally {
				setIsLoading(false);
			}
		}

		initAuth();
	}, []);

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
