import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { ClerkProvider } from "@clerk/clerk-react";
import settings from "./lib/settings.ts";
import AuthProvider from "./providers/AuthProvider.tsx";

const PUBLISHABLE_KEY = settings.CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Clerk - Missing PUBLISHABLE_KEY.");
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
			<AuthProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</AuthProvider>
		</ClerkProvider>
	</StrictMode>
);
