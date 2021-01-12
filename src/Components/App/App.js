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
  }

  render() {
    return (
      <div>
        <h1>Shu<span className="highlight">ffl</span>ing</h1>
        <div className="App">
          <SearchBar />
          <SearchResults searchResults={this.state.searchResults} />
          <div className="App-playlist">
            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
