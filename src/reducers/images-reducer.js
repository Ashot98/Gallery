import { GET_IMAGES, SAVE_IMAGE, SAVE_IMAGE_DONE } from '../actions/types';

export default function(state={data: []}, action) {
  switch (action.type) {
    case GET_IMAGES:
      return { data: action.imgs, isFetching: false }

    case SAVE_IMAGE:
      return { data: state.data, isFetching: true };
      break;
  
    case SAVE_IMAGE_DONE:
      return { data: action.imgs, isFetching: false };
      break;

    default:
      return state;
  }
}