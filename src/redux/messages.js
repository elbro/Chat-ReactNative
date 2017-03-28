import firebase from '../firebase';

const types = {
  ADD_MESSAGE: 'ADD_MESSAGE',
  SEND_MESSAGE: 'SEND_MESSAGE',
  START_FETCHING_MESSAGES: 'START_FETCHING_MESSAGES',
  RECEIVED_MESSAGES: 'RECEIVED_MESSAGES',
};

const addMessage = msg => ({
  type: types.ADD_MESSAGE,
  ...msg,
});

const sendMessage = (text, user) => ({
  type: types.SEND_MESSAGE,
  text,
  user,
});

const startFetchingMessages = () => ({
  type: types.START_FETCHING_MESSAGES,
});

const receivedMessages = () => ({
  type: types.RECEIVED_MESSAGES,
  receivedAt: Date.now(),
});

const fetchMessages = () => (dispatch) => {
  dispatch(startFetchingMessages());

  firebase.database()
    .ref('messages')
    .on('value', (snapshot) => {
      const messages = snapshot.val() || [];
      setTimeout(() => {
        Object.values(messages).forEach(msg => dispatch(addMessage(msg)));
        dispatch(receivedMessages());
      }, 0);
    });
};

export const actionCreators = {
  receivedMessages,
  fetchMessages,
  addMessage,
  sendMessage,
};

const message = (state, action) => {
  switch (action.type) {
    case types.ADD_MESSAGE:
      return {
        id: action.id,
        text: action.text,
        time: action.time,
        author: action.author,
      };
    case types.SEND_MESSAGE: {
      const msg = {
        text: action.text,
        time: Date.now(),
        author: {
          name: action.user.name,
          avatar: action.user.avatar,
        },
      };

      const newMsgRef = firebase.database().ref('messages').push();

      msg.id = newMsgRef.key;
      newMsgRef.set(msg);

      return msg;
    }
    default:
      return state;
  }
};

const messages = (state = [], action) => {
  switch (action.type) {
    case types.ADD_MESSAGE:
      if (state.map(m => m.id).includes(action.id)) {
        return state;
      }

      return [...state, message(undefined, action)];

    case types.SEND_MESSAGE:
      return [
        ...state,
        message(undefined, action),
      ];
    default:
      return state;
  }
};

export default messages;
