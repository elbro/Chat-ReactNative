import React from 'react';
import { Provider, connect } from 'react-redux';

import configureStore from './config/configureStore';

import Chat from './containers/Chat';
import Login from './containers/Login';

const store = configureStore();

const mapStateToProps = state => ({
  authorised: state.user.authorised,
});

let LoginOrChat = ({ authorised }) => (authorised ? <Chat /> : <Login />);

LoginOrChat.propTypes = {
  authorised: React.PropTypes.bool.isRequired,
};

LoginOrChat = connect(mapStateToProps)(LoginOrChat);

const App = () => (
  <Provider store={store}>
    <LoginOrChat />
  </Provider>
);

export default App;
