import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { Route, Routes } from "react-router";
import AuthCallbackPage from "./pages/auth/AuthCallbackPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/home/HomePage";
import ChatPage from "./pages/chat/ChatPage";

function App() {
	return (
		<>
			<Routes>
				<Route
					path="/sso-callback"
					element={
						<AuthenticateWithRedirectCallback
							signUpForceRedirectUrl={"/auth-callback"}
						/>
					}
				/>
				<Route path="/auth-callback" element={<AuthCallbackPage />} />

				<Route element={<MainLayout />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/chat" element={<ChatPage />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
