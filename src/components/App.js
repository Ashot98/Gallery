import React, { Component } from 'react';
import MainPage from '../pages/main-page';
import AlbumPage from '../pages/album-page';
import './App.css';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={MainPage} />
        <Route path='/albums/:name' component={AlbumPage} />
      </div>
    );
  }
}

export default App;
