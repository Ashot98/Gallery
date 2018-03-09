import React, { Fragment } from 'react';
import AlbumsList from '../components/albums-list'

const MainPage = () => {
  return (
    <Fragment>
      <h1>React Gallery</h1>
      <AlbumsList />
    </Fragment>
  );
};

export default MainPage;