import { GET_ALBUMS, ADD_ALBUM, CHANGE_ALBUM, DELETE_ALBUM } from '../actions/types';

export default function(state=[], action) {
  switch (action.type) {
    case GET_ALBUMS:
    case ADD_ALBUM:
    case CHANGE_ALBUM:
    case DELETE_ALBUM:
      return action.albums;
      break;
    
    default:
      return state;
  }
}