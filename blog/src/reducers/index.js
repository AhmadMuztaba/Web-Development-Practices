import {combineReducers} from 'redux';
import PostReducers from './postReducers';
import UserReducer from './userReducer';

export default combineReducers({
  posts:PostReducers,
  user:UserReducer,
});
