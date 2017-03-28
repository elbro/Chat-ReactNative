import React, { Component } from 'react';

import { Button, Text } from '@shoutem/ui';

class LoginButton extends Component {
  static propTypes = {
    login: React.PropTypes.func.isRequired,
  }

  onLogin = () => {
    this.props.login();
  }

  render() {
    return (
      <Button styleName="light" onPress={this.onLogin}>
        <Text>Start Chatting</Text>
      </Button>
    );
  }
}

export default LoginButton;
