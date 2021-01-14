import SearchBar from '../Components/SearchBar/SearchBar';
import { clientId, redirectUri } from './secrets';

const searchEndpoint = 'https://api.spotify.com/v1/search'
const authEndpoint = 'https://accounts.spotify.com/authorize';
const profileEndpoint = 'https://api.spotify.com/v1/me'; 
const playlistCreateEndpoint = 'https://api.spotify.com/v1/users/';
const playlistAddTrackEndpoint = 'https://api.spotify.com/v1/playlists/';
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

    async getUserInfo() {
        if(accessToken === undefined) {
            this.getAccessToken();
        }
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };
        try {
            const response = await fetch(profileEndpoint, {
                headers: headers
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                return {
                    userId: jsonResponse.id,
                    userName: jsonResponse.display_name
                };
            }
            throw new Error('UserInfo Request Failed!');
        } catch(error) {
            console.log(error);
        }
    },

    async savePlaylist(playlistName, trackURIs) {
        if(accessToken === undefined) {
            this.getAccessToken();
        }
        if (!playlistName || !trackURIs.length) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        let userId = await this.getUserInfo().userId;
        let playlistId;
        try {
            const response = await fetch(`${playlistCreateEndpoint}${userId}/playlists`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({name: playlistName})
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                playlistId = jsonResponse.id;
                await fetch(`${playlistAddTrackEndpoint}${playlistId}/tracks`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({uris: trackURIs})
                });
            }
        } catch(error) {
            console.log(error);
        }


    }
};

export default Spotify;