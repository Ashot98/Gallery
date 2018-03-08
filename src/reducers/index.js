import { combineReducers } from 'redux';
import albumsReducer from './albums-reducer';
import errorReducer from './error-reducer';

const rootReducer = combineReducers({
  //Here We Define Reducers
  albums: albumsReducer,
  errors: errorReducer
});

export default rootReducer;