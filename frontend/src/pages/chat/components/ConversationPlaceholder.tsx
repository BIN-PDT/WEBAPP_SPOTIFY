import { MessagesSquare } from "lucide-react";

const ConversationPlaceholder = () => (
	<div className="flex flex-col items-center justify-center h-full space-y-6">
		<MessagesSquare className="size-20 animate-bounce" />

		<div className="text-center">
			<h3 className="mb-1 text-zinc-300 text-lg font-title">
				No conversation selected
			</h3>
			<p className="text-zinc-500 font-content italic">
				Choose a friend to start chatting
			</p>
		</div>
	</div>
);

export default ConversationPlaceholder;
