import { GET_ALBUMS, SET_ALBUM, DELETE_ALBUM } from '../actions/types';

export default function(state=[], action) {
  switch (action.type) {
    case GET_ALBUMS:
      if(action.albums) return action.albums;
      else return [];
      break;

    case SET_ALBUM:
    case DELETE_ALBUM:
      return action.albums;
      break;
  }
  
  return state;
}