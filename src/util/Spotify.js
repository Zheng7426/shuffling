import SearchBar from '../Components/SearchBar/SearchBar';
import { clientId, redirectUri } from './secrets';

const searchEndpoint = 'https://api.spotify.com/v1/search'
const authEndpoint = 'https://accounts.spotify.com/authorize';
const responseType = 'token';
// const corsUrl = 'https://cors-anywhere.herokuapp.com/';
let accessToken;
let expiresIn;

const Spotify = {
     getAccessToken() {
        if (accessToken) {
            return accessToken;
        } else if(window.location.href.match(/access_token=([^&]*)/) !== null) {
            accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
            expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
            window.setTimeout(() => accessToken='', expiresIn * 1000);
            window.history.pushState('Access Token', '', '/');
            console.log(accessToken);
            console.log(expiresIn);
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
    }
};

export default Spotify;