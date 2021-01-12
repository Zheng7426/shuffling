import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {
  return (
    <div>
        <h1>Shu<span className="highlight">ffl</span>ing</h1>
        <div className="App">
          <SearchBar />
          <SearchResults />
          <div className="App-playlist">
            <Playlist />
          </div>
        </div>
    </div>
  );
}

export default App;
