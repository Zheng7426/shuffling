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
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
