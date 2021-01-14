import SearchBar from '../Components/SearchBar/SearchBar';
import { clientId, redirectUri } from './secrets';

const searchEndpoint = 'https://api.spotify.com/v1/search'
const authEndpoint = 'https://accounts.spotify.com/authorize';
const profileEndpoint = 'https://api.spotify.com/v1/me'; 
const playlistEndpoint = 'https://api.spotify.com/v1/users/';
//const playlistAddTrackEndpoint = 'https://api.spotify.com/v1/playlists/';
const responseType = 'token';
let accessToken;

const Spotify = {
     getAccessToken() {
        if (accessToken) {
            return accessToken;
        } 
        
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`;
        }
    },

    async search(term) {
        try {
            const response = await fetch(`${searchEndpoint}?type=track&q=${term}`, 
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                const tracks = jsonResponse.tracks.items.map(track => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    };
                });
                return tracks;
            }
            throw new Error('Request Failed!');
        } catch(error) {
            console.log(error);
        }
    },

    async savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs.length) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const getHeaders = {
            Authorization: `Bearer ${accessToken}`
        };
        const postHeaders = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
        let userId;
        
        try {
            const userResponse = await fetch(profileEndpoint, {
                headers: getHeaders
            });
            if (userResponse.ok) {
                const jsonUserResponse = await userResponse.json();
                userId = jsonUserResponse.id;
                const playlistResponse = await fetch(`${playlistEndpoint}${userId}/playlists`, {
                    headers: postHeaders,
                    method: 'POST',
                    body: JSON.stringify({name: playlistName})
                });
                if (playlistResponse.ok) {
                    const jsonPlaylistResponse = await playlistResponse.json();
                    const playlistId = jsonPlaylistResponse.id;
                    const addTrackResponse = await fetch(`${playlistEndpoint}${userId}/playlists/${playlistId}/tracks`, {
                        headers: postHeaders,
                        method: 'POST',
                        body: JSON.stringify({ uris: trackURIs})
                    });
                }
            }
        } catch(error) {
            console.log(error);
        }
    }
};

export default Spotify;