import { Send } from "lucide-react";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/stores/useChatStore";

const MessageInput = () => {
	const { user } = useUser();
	const { selectedUser, sendMessage } = useChatStore();
	const [newMessage, setNewMessage] = useState("");

	const handleSend = () => {
		if (!user || !selectedUser || !newMessage) return;

		sendMessage(user.id, selectedUser.clerkId, newMessage.trim());
		setNewMessage("");
	};

	return (
		<div className="p-4 mt-auto border-t border-zinc-800">
			<div className="flex gap-4">
				<Input
					placeholder="Type a message"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					className="bg-zinc-800 border-none !outline-none font-content"
					onKeyDown={(e) => e.key === "Enter" && handleSend()}
				/>

				<Button
					size={"icon"}
					onClick={handleSend}
					disabled={!newMessage.trim()}
				>
					<Send className="size-4" />
				</Button>
			</div>
		</div>
	);
};

export default MessageInput;
