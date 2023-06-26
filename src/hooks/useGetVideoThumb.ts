import axios from 'axios';
import { useReducer } from 'react';

const types = {
	FETCHING: 'FETCHING',
	SUCCESS: 'SUCCESS',
	ERROR: 'ERROR',
};

const initialState = {
	loading: false,
	error: null,
	url: '',
};

function reducer(state: any, action: any): any {
	switch (action.type) {
		case types.FETCHING: {
			return { ...state, loading: true };
		}

		case types.SUCCESS: {
			return { ...state, loading: false, url: action.url };
		}

		case types.ERROR: {
			const { error } = action;
			return { ...state, loading: false, error };
		}

		default: {
			return state;
		}
	}
}

export function useGetVideoThumb() {
	const [state, dispatch] = useReducer(reducer, initialState);

	function extractVideoId(videoUrl: string): string {
		const regex =
			/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?\s&]+)/;
		const match = videoUrl.match(regex);
		const videoId = (match && match[1]) || '';
		return videoId;
	}
	async function getYouTubeThumbnail(videoUrl: string): Promise<string> {
		const videoId = extractVideoId(videoUrl);

		const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`;
		dispatch({ type: types.FETCHING });

		try {
			const response = await axios.get(apiUrl);
			const thumbnailUrl = response.data.items[0].snippet.thumbnails.default.url;
			console.log(thumbnailUrl);
			dispatch({ type: types.SUCCESS, url: thumbnailUrl });
			return thumbnailUrl;
		} catch (error) {
			console.error('Erro ao obter a thumbnail do vídeo:', error);
			throw error;
		}
	}

	return {
		getYouTubeThumbnail,
		videoThumbnail: state.url,
		thumbnailError: state.error,
		thumbnailLoading: state.loading,
	};
}
