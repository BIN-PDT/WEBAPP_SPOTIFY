import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UsersListSkeleton from "@/components/skeletons/UsersListSkeleton";
import { useChatStore } from "@/stores/useChatStore";

const UsersList = () => {
	const { isLoading, users, onlineUsers, selectedUser, setSelectedUser } =
		useChatStore();

	return (
		<div className="border-r border-zinc-800">
			<div className="flex flex-col h-full">
				<ScrollArea className="h-[calc(100vh-180px)]">
					{isLoading ? (
						<UsersListSkeleton />
					) : (
						<div className="p-4 space-y-4 lg:space-y-2">
							{users.map((user) => (
								<div
									key={user._id}
									onClick={() => setSelectedUser(user)}
									className={`flex items-center justify-center lg:justify-start gap-3 p-0 lg:p-3 rounded-lg cursor-pointer transition-colors ${
										selectedUser?.clerkId === user.clerkId
											? "bg-zinc-800"
											: "hover:bg-zinc-800/50"
									}`}
								>
									<div className="relative">
										<Avatar className="size-12">
											<AvatarImage src={user.imageUrl} />

											<AvatarFallback>
												{user.fullName[0]}
											</AvatarFallback>
										</Avatar>
										{/* ONLINE INDICATOR */}
										<div
											className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-zinc-900 ${
												onlineUsers.has(user.clerkId)
													? "bg-green-500"
													: "bg-zinc-500"
											}`}
										/>
									</div>

									<div className="flex-1 min-w-0 hidden lg:block">
										<span className="max-w-full text-sm font-content text-balance">
											{user.fullName}
										</span>
									</div>
								</div>
							))}
						</div>
					)}
				</ScrollArea>
			</div>
		</div>
	);
};

export default UsersList;
