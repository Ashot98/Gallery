import { combineReducers } from 'redux';
import albumsReducer from './albums-reducer';

const rootReducer = combineReducers({
  //Here We Define Reducers
  albums: albumsReducer
});

export default rootReducer;