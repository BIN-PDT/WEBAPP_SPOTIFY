import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth/AuthCallbackPage";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/sso-callback"
					element={
						<AuthenticateWithRedirectCallback
							signUpForceRedirectUrl={"/auth-callback"}
						/>
					}
				/>
				<Route path="/auth-callback" element={<AuthCallbackPage />} />
			</Routes>
		</>
	);
}

export default App;
