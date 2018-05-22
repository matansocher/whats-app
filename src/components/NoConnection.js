import React, { Component } from 'react';

class NoConnection extends Component {

  componentWillMount() {
    this.refreshIntervalId = setInterval(() => {
      if (navigator.onLine) {
        this.props.history.push('/');
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.refreshIntervalId);
  }

  render() {
    return (
      <div>
        <h1>Please check your internet connection</h1>
      </div>
    );
  }
}

export default NoConnection;