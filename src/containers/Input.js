import React, { Component } from 'react';

import { TextInput } from '@shoutem/ui';

class Input extends Component {
  static propTypes = {
    submitAction: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    noclear: React.PropTypes.bool,
    submitOnBlur: React.PropTypes.bool,
    onFocus: React.PropTypes.func,
    onLayout: React.PropTypes.func,
    style: React.PropTypes.object,
  }

  state = {
    text: null,
  }

  onChangeText = text => this.setState({ text });

  onSubmitEditing = () => {
    this.props.submitAction(this.state.text);

    if (!this.props.noclear) {
      this.setState({
        text: null,
      });
    }
  }

  onFocus = () => {
    if (this.props.onFocus) {
      this.props.onFocus(this.input);
    }
  }

  onBlur = () => {
    if (this.props.submitOnBlur) {
      this.onSubmitEditing();
    }
  }

  onLayout = (event) => {
    if (this.props.onLayout) {
      this.props.onLayout(event);
    }
  }

  render() {
    return (
      <TextInput
        style={this.props.style}
        placeholder={this.props.placeholder}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.onSubmitEditing}
        onLayout={this.onLayout}
        value={this.state.text}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        ref={(x) => { this.input = x; }}
      />
    );
  }
}

export default Input;
