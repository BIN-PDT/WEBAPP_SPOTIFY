export interface User {
	_id: string;
	clerkId: string;
	fullName: string;
	imageUrl: string;
}

export interface Song {
	_id: string;
	title: string;
	artist: string;
	albumId: string | null;
	imageUrl: string;
	audioUrl: string;
	duration: number;
	createdAt: string;
	updatedAt: string;
}

export interface AdminAlbum {
	_id: string;
	title: string;
	artist: string;
	imageUrl: string;
	releaseYear: number;
	songs: string[];
}

export interface Album {
	_id: string;
	title: string;
	artist: string;
	imageUrl: string;
	releaseYear: number;
	songs: Song[];
}

export interface Stats {
	totalSongs: number;
	totalAlbums: number;
	totalUsers: number;
	totalArtists: number;
}

export interface Message {
	_id: string;
	senderId: string;
	receiverId: string;
	content: string;
	createdAt: string;
	updatedAt: string;
}

// DIALOG.

export interface SongInfo {
	title: string;
	artist: string;
	album: string;
	duration: string;
}

export interface SongFiles {
	audio: File | null;
	image: File | null;
}

export interface AlbumInfo {
	title: string;
	artist: string;
	releaseYear: string;
}

export interface AlbumFile {
	image: File | null;
}

// SOCKET.

export interface SocketAuth {
	userId: string;
}

export interface UserActivity {
	title: string;
	artist: string;
}
