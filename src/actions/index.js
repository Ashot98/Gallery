import { GET_ALBUMS, SET_ALBUM, DELETE_ALBUM } from './types';

export function getAlbums() {
  let albums;
  const stored = JSON.parse(localStorage.gallery);
  if(stored.albums) {
    albums = stored.albums.map((item) => item.name);
  }

  return {
    type: GET_ALBUMS,
    albums
  }
}

export function setAlbum(albumName, albumData=[]) {
  const stored = JSON.parse(localStorage.gallery);
  stored.albums.push({name: albumName, imgs: albumData});
  localStorage.gallery = JSON.stringify(stored);

  let albums = stored.albums.map((item) => item.name);

  return {
    type: SET_ALBUM,
    albums
  }
}

export function deleteAlbum(albumName) {
  const stored = JSON.parse(localStorage.gallery);
  const deleted = stored.albums.filter((item) => item.name !== albumName);
  stored.albums = deleted;
  localStorage.gallery = JSON.stringify(stored);

  let albums = stored.albums.map((item) => item.name);

  return {
    type: DELETE_ALBUM,
    albums
  }
}