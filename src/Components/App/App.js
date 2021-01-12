import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';


function App() {
  return (
    <div>
        <h1>Shu<span className="highlight">ffl</span>ing</h1>
        <div className="App">
          <SearchBar />
          <SearchResults />
          <div className="App-playlist">

          </div>
        </div>
    </div>
  );
}

export default App;
