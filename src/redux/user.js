import { actionCreators as messageActions } from '../redux/messages';
import firebase from '../firebase';

const types = {
  SET_USER_NAME: 'SET_USER_NAME',
  SET_USER_AVATAR: 'SET_USER_AVATAR',
  USER_START_AUTHORISING: 'USER_START_AUTHORISING',
  USER_AUTHORISED: 'USER_AUTHORISED',
};

export const actionCreators = {
  setUserName: name => ({
    type: types.SET_USER_NAME,
    name,
  }),

  setUserAvatar: avatar => ({
    type: types.SET_USER_AVATAR,
    avatar: avatar && avatar.length > 0 ? avatar : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png',
  }),

  startAuthorising: () => ({
    type: types.USER_START_AUTHORISING,
  }),

  userAuthorised: () => ({
    type: types.USER_AUTHORISED,
  }),

  login: () => (dispatch) => {
    dispatch(actionCreators.startAuthorising());

    return firebase.auth()
      .signInAnonymously()
      .then(() => {
        dispatch(actionCreators.userAuthorised());
        dispatch(messageActions.fetchMessages());
      });
  },
};

const initialState = {
  name: null,
  avatar: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png',
  authorising: false,
  authorised: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_NAME:
      return {
        ...state,
        name: action.name,
      };
    case types.SET_USER_AVATAR:
      return {
        ...state,
        avatar: action.avatar,
      };
    case types.USER_START_AUTHORISING:
      return {
        ...state,
        authorising: true,
      };
    case types.USER_AUTHORISED:
      return {
        ...state,
        authorising: false,
        authorised: true,
      };
    default:
      return state;
  }
};
