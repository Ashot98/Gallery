import { combineReducers } from 'redux';
import albumsReducer from './albums-reducer';
import errorReducer from './error-reducer';
import imagesReducer from './images-reducer';

const rootReducer = combineReducers({
  //Here We Define Reducers
  albums: albumsReducer,
  errors: errorReducer,
  images: imagesReducer
});

export default rootReducer;