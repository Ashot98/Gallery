import { GET_ALBUMS, ADD_ALBUM, CHANGE_ALBUM, DELETE_ALBUM, DELETE_MODAL_ERROR, GET_IMAGES, SAVE_IMAGE, SAVE_IMAGE_DONE } from './types';

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


//delete modal unique error if modal window closed
export function deleteError() {
  return {
    type: DELETE_MODAL_ERROR
  }
}

//Get images from localstorage and save them in store
export function getImages(albumName) {
  const stored = JSON.parse(localStorage.gallery);
  const reqAlbum = stored.albums.filter((album) => album.name === albumName)[0];
  let imgs = reqAlbum.imgs;

  return {
    type: GET_IMAGES,
    imgs
  }
}

//Save image is done
function saveImageDone(res, albumName) {
  const stored = JSON.parse(localStorage.gallery);
  let imgs;
  stored.albums = stored.albums.map(album => {
    if(album.name === albumName) {
      const newID = album.imgs.length + 1;
      album.imgs.push({ id: newID, path: res.data.link });
      imgs = album.imgs;
    }
    return album;
  })

  localStorage.gallery = JSON.stringify(stored);

  return {
    type: SAVE_IMAGE_DONE,
    imgs
  }
}

//Save image in Imgur
export function saveImage(albumName, image) {
  const CLIENT_ID = '397d5a04a8f6896';

  let xhttp = new XMLHttpRequest();
  let fd = new FormData();

  xhttp.open('POST', `https://api.imgur.com/3/image`);
  xhttp.setRequestHeader('Authorization', `Client-ID ${CLIENT_ID}`);
  xhttp.onreadystatechange = () => {
    if (xhttp.status === 200 && xhttp.readyState === 4) {
      const res = JSON.parse(xhttp.responseText);
      saveImageDone(res, albumName);
    }
  }
  fd.append('image', image);
  xhttp.send(fd);

  return {
    type: SAVE_IMAGE
  }
}