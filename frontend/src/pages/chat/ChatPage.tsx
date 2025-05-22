import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Topbar from "@/components/Topbar";
import UsersList from "./components/UsersList";
import MessageInput from "./components/MessageInput";
import ConversationPlaceholder from "./components/ConversationPlaceholder";
import { useChatStore } from "@/stores/useChatStore";
import { formatTime } from "@/utils";
import EmptyContent from "@/components/EmptyContent";

const ChatPage = () => {
	const { user } = useUser();
	const { users, selectedUser, messages, fetchUsers, fetchMessages } =
		useChatStore();

	useEffect(() => {
		const abortController = new AbortController();

		if (user) fetchUsers(abortController.signal);

		return () => abortController.abort();
	}, [user]);

	useEffect(() => {
		const abortController = new AbortController();

		if (selectedUser) {
			fetchMessages(selectedUser.clerkId, abortController.signal);
		}

		return () => abortController.abort();
	}, [selectedUser]);

	return users.length === 0 ? (
		<div className="size-full flex items-center justify-center">
			<EmptyContent />
		</div>
	) : (
		<main className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
			<Topbar />

			<div className="grid lg:grid-cols-[280px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
				{/* USER LIST */}
				<UsersList />
				{/* CHAT FRAME */}
				<div className="flex flex-col h-full">
					{!selectedUser ? (
						<ConversationPlaceholder />
					) : (
						<>
							{/* MESSAGE HISTORY */}
							<ScrollArea className="h-[calc(100vh-305px)]">
								<div className="p-4 space-y-4">
									{messages.map((message) => (
										<div
											key={message._id}
											className={`flex items-start gap-3 ${
												message.senderId === user?.id
													? "flex-row-reverse"
													: ""
											}`}
										>
											<Avatar className="size-8">
												<AvatarImage
													src={
														message.senderId ===
														user?.id
															? user.imageUrl
															: selectedUser.imageUrl
													}
												/>
											</Avatar>

											<div
												className={`rounded-lg p-3 min-w-[20%] max-w-[70%] font-content ${
													message.senderId ===
													user?.id
														? "bg-green-500"
														: "bg-zinc-800"
												}
												`}
											>
												<p className="text-sm">
													{message.content}
												</p>
												<span className="text-xs text-zinc-200 mt-1 block">
													{formatTime(
														message.createdAt
													)}
												</span>
											</div>
										</div>
									))}
								</div>
							</ScrollArea>
							{/* MESSAGE INPUT */}
							<MessageInput />
						</>
					)}
				</div>
			</div>
		</main>
	);
};

export default ChatPage;
