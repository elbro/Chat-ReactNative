import { combineReducers } from 'redux';

import messages from './messages';

const types = {
  START_FETCHING_MESSAGES: 'START_FETCHING_MESSAGES',
  UPDATE_MESSAGES_HEIGHT: 'UPDATE_MESSAGES_HEIGHT',
  RECEIVED_MESSAGES: 'RECEIVED_MESSAGES',
};

export const startFetchingMessages = () => ({
  type: 'START_FETCHING_MESSAGES',
});

export const receivedMessages = () => ({
  type: 'RECEIVED_MESSAGES',
  receivedAt: Date.now(),
});

export const updateMessagesHeight = (event) => {
  const layout = event.nativeEvent.layout;

  return {
    type: types.UPDATE_MESSAGES_HEIGHT,
    height: layout.height,
  };
};

const initialState = {
  isFetching: false,
  lastFetched: null,
  height: 0,
};

const meta = (state = initialState, action) => {
  switch (action.type) {
    case types.START_FETCHING_MESSAGES:
      return {
        ...state,
        isFetching: true,
      };
    case types.RECEIVED_MESSAGES:
      return {
        ...state,
        isFetching: false,
        lastFetched: action.receivedAt,
      };
    case types.UPDATE_MESSAGES_HEIGHT:
      return {
        ...state,
        height: action.height,
      };
    default:
      return state;
  }
};

const chatroom = combineReducers({
  messages,
  meta,
});

export default chatroom;
