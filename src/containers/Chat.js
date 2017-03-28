import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';

import { Title, Screen } from '@shoutem/ui';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Messages from './Messages';
import Input from './Input';

import { actionCreators as messageActions } from '../redux/messages';

class Chat extends Component {
  static propTypes = {
    user: PropTypes.object,
    chatHeight: PropTypes.number,
    sendMessage: PropTypes.func,
  }

  state = {
    scrollViewHeight: 0,
    inputHeight: 0,
  }

  componentDidMount() {
    this.scrollToBottom(false);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  onScrollViewLayout = (event) => {
    const layout = event.nativeEvent.layout;

    this.setState({
      scrollViewHeight: layout.height,
    });
  }

  onInputLayout = (event) => {
    const layout = event.nativeEvent.layout;

    this.setState({
      inputHeight: layout.height,
    });
  }

  scrollToBottom(animate = true) {
    const { scrollViewHeight, inputHeight } = this.state;
    const { chatHeight } = this.props;

    const scrollTo = chatHeight - (scrollViewHeight + inputHeight);

    if (scrollTo > 0) {
      this.scroll.scrollToPosition(0, scrollTo, animate);
    }
  }

  scrollToInput = (reactRef) => {
    this.scroll.scrollToFocusedInput(ReactNative.findNodeHandle(reactRef));
  }

  sendMessage = (text) => {
    const { user } = this.props;
    this.props.sendMessage(text, user);
  }

  render() {
    return (
      <Screen>
        <Title styleName="h-center" style={{ paddingTop: 10 }}>
          Global Chatroom
        </Title>
        <KeyboardAwareScrollView
          ref={(x) => { this.scroll = x; }}
          onLayout={this.onScrollViewLayout}
        >
          <Messages />
          <Input
            onLayout={this.onInputLayout}
            onFocus={this.scrollToInput}
            submitAction={this.sendMessage}
            ref={(x) => { this.input = x; }}
            placeholder="Say something ..."
          />
        </KeyboardAwareScrollView>
      </Screen>
    );
  }
}

const mapStateToProps = state => ({
  chatHeight: state.chatroom.meta.height,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  sendMessage: (text, user) => dispatch(messageActions.sendMessage(text, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
