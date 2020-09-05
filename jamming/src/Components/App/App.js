import React from 'react';
import './App.css';
import SearchBar from "../SeachBar/SearchBar"
import Playlist from "../Playlist/Playlist"
import SearchResult from '../SearchResult/SearchResult'
import Spotify from '../../util/spotify'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{name: 'name1', artist: 'artist1', album: 'album1', id: 1 },
      {name: 'name2', artist: 'artist2', album: 'album2', id: 2 },
      {name: 'name3', artist: 'artist3', album: 'album3', id: 3 }],
      playlistName: 'My Playlist',
      playlistTracks:[{name: 'playlistName1', artist: 'playlistArtist1', album: 'playlistAlbum1', id: 4 },
      {name: 'playlistName2', artist: 'playlistArtist2', album: 'playlistAlbum2', id: 5 },
      {name: 'playlistName3', artist: 'playlistArtist3', album: 'playlistAlbum3', id: 6}]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }
  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return
    }
    this.state.playlistTracks.push(track)
    this.setState({playlistTrack: this.state.playlistTracks})
    
  }
  removeTrack(track){
    // this.state.playlistTracks.filter(removedTrack => removedTrack.id !== track.id)
    let tracks = this.state.playlistTracks.filter(currentTrack => currentTrack.id !== track.id)
    this.setState({playlistTrack: tracks})
    }
  
  updatePlaylistName(name){
    this.setState({playlistName: name})
  }

  savePlaylist(){
    let tracks = this.state.playlistTracks
    let trackUris = tracks.map(track => track.uri)
    // fulfiling the promise/await the function to update the state. 
    Spotify.savePlaylist(this.state.playlistName, trackUris )
    this.setState({playlistName: 'New Playlist',playlistTracks: []})
    

  }
  // receving objects from reponse.json(object).track(object).items(arr).map({to object})RETURNS ARRAY OF OBJECTS
  search(term){
    Spotify.search(term).then(searchResults => this.setState({searchResults: searchResults}))
  }


  render(){
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResult searchResults={this.state.searchResults}
              onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    )
  }
}




export default App;
