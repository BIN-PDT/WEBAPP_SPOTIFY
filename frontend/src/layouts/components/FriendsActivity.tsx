import { Music, Users } from "lucide-react";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import LoginPrompt from "@/components/LoginPrompt";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";

const FriendsActivity = () => {
	const { users, fetchUsers } = useChatStore();
	const { user } = useUser();

	useEffect(() => {
		if (user) fetchUsers();
	}, []);

	return (
		<div className="h-full bg-zinc-900 rounded-lg flex flex-col">
			<div className="p-4 flex justify-between items-center border-b border-zinc-800">
				<div className="flex items-center gap-2">
					<Users className="size-5 shrink-0 mr-2" />
					<h2 className="font-title">What they're listening to</h2>
				</div>
			</div>

			{!user && <LoginPrompt />}

			<ScrollArea className="flex-1">
				<div className="p-4 space-y-4">
					{users.map((user) => {
						const isPlaying = true;

						return (
							<div
								key={user._id}
								className="cursor-pointer hover:bg-zinc-800/50 p-3 rounded-md transition-colors group"
							>
								<div className="flex items-start gap-3">
									{/* USER AVATAR */}
									<div className="relative">
										<Avatar className="size-10 border border-zinc-800">
											<AvatarImage
												src={user.imageUrl}
												alt={user.fullName}
											/>
											<AvatarFallback>
												{user.fullName[0]}
											</AvatarFallback>
										</Avatar>

										<div
											className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-zinc-900 bg-zinc-500"
											aria-hidden="true"
										/>
									</div>

									<div className="flex-1 min-w-0 font-content">
										{/* USER INFO */}
										<div className="flex items-center gap-2">
											<span className="font-medium text-sm text-white">
												{user.fullName}
											</span>
											{isPlaying && (
												<Music className="size-3.5 text-emerald-400 shrink-0" />
											)}
										</div>
										{/* SONG INFO */}
										<div className="mt-1">
											{isPlaying ? (
												<>
													<div className="text-sm text-white truncate">
														Cardigan
													</div>
													<div className="text-xs text-zinc-400 truncate">
														by Taylor Swift
													</div>
												</>
											) : (
												<div className="text-xs text-zinc-400">
													Idle
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</ScrollArea>
		</div>
	);
};

export default FriendsActivity;
