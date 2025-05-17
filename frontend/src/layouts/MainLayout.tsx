import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import AudioPlayer from "./components/AudioPlayer";
import LeftSidebar from "./components/LeftSidebar";
import FriendsActivity from "./components/FriendsActivity";
import PlaybackControl from "./components/PlaybackControl";

const MainLayout = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		function checkMobile() {
			setIsMobile(window.innerWidth < 768);
		}

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	return (
		<div className="h-screen bg-black text-white flex flex-col">
			<AudioPlayer />

			<ResizablePanelGroup
				direction="horizontal"
				className="flex-1 flex h-full overflow-hidden p-2"
			>
				{/* LEFT SIDEBAR */}
				<ResizablePanel
					defaultSize={20}
					minSize={isMobile ? 0 : 10}
					maxSize={30}
				>
					<LeftSidebar />
				</ResizablePanel>
				{/* MAIN CONTENT */}
				<ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
				<ResizablePanel defaultSize={isMobile ? 80 : 60}>
					<Outlet />
				</ResizablePanel>
				<ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
				{/* RIGHT SIDEBAR */}
				<ResizablePanel
					defaultSize={20}
					minSize={0}
					maxSize={25}
					collapsedSize={0}
				>
					<FriendsActivity />
				</ResizablePanel>
			</ResizablePanelGroup>

			<PlaybackControl />
		</div>
	);
};

export default MainLayout;
