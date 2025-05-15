import { LayoutDashboardIcon } from "lucide-react";
import {
	SignedIn,
	SignedOut,
	SignOutButton,
	UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router";
import SignInOAuthButton from "./SignInOAuthButton";

const Topbar = () => {
	const isAdmin = false;

	return (
		<div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
			<div className="flex gap-2 items-center">
				<img src="/spotify.png" className="size-8" alt="Spotify logo" />
				<span className="text-2xl font-header">Spotify</span>
			</div>

			<div className="flex items-center gap-4">
				{isAdmin && (
					<Link to={"/admin"}>
						<LayoutDashboardIcon className="size-4  mr-2" />
						Admin Dashboard
					</Link>
				)}

				<SignedIn>
					<div className="font-title">
						<SignOutButton />
					</div>
				</SignedIn>

				<SignedOut>
					<SignInOAuthButton />
				</SignedOut>

				<UserButton />
			</div>
		</div>
	);
};

export default Topbar;
