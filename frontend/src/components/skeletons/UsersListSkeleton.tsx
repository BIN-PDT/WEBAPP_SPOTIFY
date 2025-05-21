const UsersListSkeleton = () => {
	return (
		<div className="p-4 space-y-4 lg:space-y-2">
			{Array.from({ length: 6 }).map((_, i) => (
				<div
					key={i}
					className="p-0 lg:p-2 rounded-md flex items-center justify-center gap-4"
				>
					<div className="size-12 bg-zinc-800 rounded-md flex-shrink-0 animate-pulse" />
					<div className="flex-1 min-w-0 hidden lg:block space-y-2">
						<div className="h-5 bg-zinc-800 rounded animate-pulse w-3/4" />
						<div className="h-5 bg-zinc-800 rounded animate-pulse w-1/2" />
					</div>
				</div>
			))}
		</div>
	);
};

export default UsersListSkeleton;
