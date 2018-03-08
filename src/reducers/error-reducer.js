import { ADD_ALBUM, CHANGE_ALBUM } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_ALBUM:
      if(action.error) {
        return {...state, uniqueError: action.error};
      }
      return {...state, uniqueError: undefined};
      break;

    case CHANGE_ALBUM:
      if(action.error) {
        return {...state, modalUniqueError: action.error};
      }
      return {...state, modalUniqueError: undefined};
      break;
  
    default:
      return state;
  }
}