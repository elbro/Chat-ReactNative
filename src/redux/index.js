import { combineReducers } from 'redux';
import * as userRedux from './user';
import chatroom from './chatroom';

const rootReducer = combineReducers({
  chatroom,
  user: userRedux.reducer,
});

export default rootReducer;
export const userActionCreators = userRedux.actionCreators;
