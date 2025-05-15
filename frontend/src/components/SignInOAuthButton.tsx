import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButton = () => {
	const { isLoaded, signIn } = useSignIn();

	if (!isLoaded) return null;

	const signInWithGoogle = () => {
		signIn.authenticateWithRedirect({
			strategy: "oauth_google",
			redirectUrl: "/sso-callback",
			redirectUrlComplete: "/auth-callback",
		});
	};

	return (
		<Button
			onClick={signInWithGoogle}
			variant={"secondary"}
			className="w-full border-zinc-200 h-11 text-white font-title"
		>
			<img src="/google.png" alt="Google" className="size-5" />
			Continue with Google
		</Button>
	);
};

export default SignInOAuthButton;
