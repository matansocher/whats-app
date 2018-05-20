import React, { Component } from 'react';

export default class NoMatch extends Component {

  componentWillMount() {
    this.props.history.push('/');
  }

  render() {
    return (<div></div>);
  }
}
