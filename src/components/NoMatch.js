import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NoMatch extends Component {

  componentWillMount() {
    this.props.history.push('/');
  }

  render() {
    return (<div></div>);
  }
}
