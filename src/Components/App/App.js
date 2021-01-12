import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'homesick',
          artist: 'kings of convenience',
          album: 'riot in an empty street',
          id: 1
        },
        {
          name: 'When we were young',
          artist: 'adele',
          album: '25',
          id: 2
        }
      ],

      playlistName: 'Sum',
      playlistTracks: [
        {
          name: 'Merry Christmas Mr.Lawrrence',
          artist: 'Ryuichi Sakamoto',
          album: 'Songs',
          id: 3
        },
        {
          name: 'Cherry Blossom Time',
          artist: 'Kotaro Ishio',
          album: 'Songs',
          id: 4
        }
      ]
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
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

  render() {
    return (
      <div>
        <h1>Shu<span className="highlight">ffl</span>ing</h1>
        <div className="App">
          <SearchBar />
          <SearchResults searchResults={this.state.searchResults}
                         onAdd={this.addTrack} />
          <div className="App-playlist">
            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks} 
                      onRemove={this.removeTrack} 
                      onNameChange={this.updatePlaylistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
