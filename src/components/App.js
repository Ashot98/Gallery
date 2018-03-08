import React, { Component } from 'react';
import AlbumsList from './albums-list';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>React Gallery</h1>
        <AlbumsList />
      </div>
    );
  }
}

export default App;
