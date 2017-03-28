import React from 'react';
import { connect } from 'react-redux';
import { View, Spinner } from '@shoutem/ui';

import MessageList from '../components/MessageList';
import { updateMessagesHeight } from '../redux/chatroom';

const mapStateToProps = state => ({
  messages: state.chatroom.messages,
  isFetching: state.chatroom.meta.isFetching,
});

const Messages = ({ messages, isFetching, dispatch }) => {
  if (isFetching) {
    return (
      <View style={{ paddingTop: 50, paddingBottom: 50 }}>
        <Spinner />
      </View>
    );
  }
  return (
    <MessageList
      messages={messages}
      style={{ minHeight: 100 }}
      onLayout={event => dispatch(updateMessagesHeight(event))}
    />
  );
};

export default connect(mapStateToProps)(Messages);
