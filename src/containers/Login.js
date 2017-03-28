import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Screen, Title, Divider, Spinner } from '@shoutem/ui';

import Input from './Input';
import LoginButton from '../components/LoginButton';
import { userActionCreators } from '../redux';

class Login extends Component {
  static propTypes = {
    authorising: React.PropTypes.bool.isRequired,
    name: React.PropTypes.string,
    setUsername: React.PropTypes.func.isRequired,
    setAvatar: React.PropTypes.func.isRequired,
    login: React.PropTypes.func.isRequired,
  }

  onLogin = () => {
    if (!this.props.name) {
      this.props.setUsername(this.username.state.text);
    }
    this.props.login();
  }

  render() {
    return (
      <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Title>Who are you?</Title>
        <Divider />

        <Input
          style={{ alignSelf: 'center', width: '70%' }}
          placeholder="Your name here"
          submitAction={this.props.setUsername}
          submitOnBlur
          noclear
          ref={(x) => { this.username = x; }}
        />
        <Divider />

        <Input
          style={{ alignSelf: 'center', width: '70%' }}
          placeholder="Your avatar URL here"
          submitAction={this.props.setAvatar}
          submitOnBlur
          noclear
          ref={(x) => { this.avatar = x; }}
        />
        <Divider />

        {this.props.authorising ? <Spinner /> : <LoginButton login={this.onLogin} />}
      </Screen>
    );
  }
}

const mapStateToProps = state => ({
  authorising: state.user.authorising,
  name: state.user.name,
});

const mapDispatchToProps = dispatch => ({
  setUsername: (name) => { dispatch(userActionCreators.setUserName(name)); },
  setAvatar: (avatar) => { dispatch(userActionCreators.setUserAvatar(avatar)); },
  login: () => { dispatch(userActionCreators.login()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
