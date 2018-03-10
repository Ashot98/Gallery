import { GET_IMAGES, SAVE_IMAGE, SAVE_IMAGE_DONE, DELETE_IMAGE, SAVE_IN_STORAGE } from '../actions/types';

export default function(state={data: []}, action) {
  switch (action.type) {
    case GET_IMAGES:
      return { data: action.imgs, status: 'none' }
      break;

    case SAVE_IMAGE:
      return { data: state.data, status: 'fetching' };
      break;
  
    case SAVE_IMAGE_DONE:
      return { data: state.data, newImg: action.newImg, status: 'fetched' };
      break;

    case SAVE_IN_STORAGE:
      return { data: action.imgs, status: 'none' }
      break;

    case DELETE_IMAGE:
      return { data: action.imgs, status: 'none' };

    default:
      return state;
  }
}