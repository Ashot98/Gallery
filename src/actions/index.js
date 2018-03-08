import { GET_ALBUMS, ADD_ALBUM, CHANGE_ALBUM, DELETE_ALBUM } from './types';

//Get all albums from LocalStorage and save it in app store
export function getAlbums() {
  let albums;
  const stored = JSON.parse(localStorage.gallery);
  if(stored.albums) {
    albums = stored.albums.map((album) => album.name);
  } else {
    albums = [];
  }

  return {
    type: GET_ALBUMS,
    albums
  }
}


//Create new album
export function addAlbum(albumName, albumData=[]) {
  const stored = JSON.parse(localStorage.gallery);
  let albums;

  //Checking Name Uniqueness
  const unique = stored.albums.filter((album) => album.name === albumName);
  if(unique.length) {
    albums = stored.albums.map((album) => album.name);
    return {
      type: ADD_ALBUM,
      error: 'Name must be unique',
      albums
    }
  }

  stored.albums.push({name: albumName, imgs: albumData});
  localStorage.gallery = JSON.stringify(stored);

  albums = stored.albums.map((album) => album.name);

  return {
    type: ADD_ALBUM,
    albums
  }
}

//Change album name
export function changeAlbum(albumName, newName) {
  const stored = JSON.parse(localStorage.gallery);
  let albums;

  //Checking Name Uniqueness
  const unique = stored.albums.filter((album) => album.name === newName);
  if(unique.length) {
    albums = stored.albums.map((album) => album.name);
    return {
      type: CHANGE_ALBUM,
      error: 'Name must be unique',
      albums
    }
  }

  //Find album and change its name
  stored.albums = stored.albums.map((album) => {
    if(album.name === albumName) {
      album.name = newName;
    }
    return album;
  });

  localStorage.gallery = JSON.stringify(stored);
  albums = stored.albums.map((album) => album.name);

  return {
    type: CHANGE_ALBUM,
    albums
  }
}

//Delete album and return rest
export function deleteAlbum(albumName) {
  const stored = JSON.parse(localStorage.gallery);
  const deleted = stored.albums.filter((album) => album.name !== albumName);
  stored.albums = deleted;
  localStorage.gallery = JSON.stringify(stored);

  let albums = stored.albums.map((album) => album.name);

  return {
    type: DELETE_ALBUM,
    albums
  }
}