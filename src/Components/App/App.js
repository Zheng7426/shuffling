import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: []
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    this.setState({
      playlistTracks: [...this.state.playlistTracks, track]
    });
  }

  removeTrack(track) {
    if (this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      this.setState({
        playlistTracks: this.state.playlistTracks.filter((savedTrack) => savedTrack.id !== track.id)
      });
    }
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    );
  }

  search(term) {
    //console.log(`You wanted to search ${term}.`);
    Spotify.search(term).then(tracks => {
      this.setState({
        searchResults: tracks
      });
    });
    // console.log(Spotify.search(term));
  }



  render() {
    return (
      <div>
        <h1>Shu<span className="highlight">ffl</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                         onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks} 
                      onRemove={this.removeTrack} 
                      onNameChange={this.updatePlaylistName} 
                      onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    Spotify.getAccessToken();
  }
}

export default App;
