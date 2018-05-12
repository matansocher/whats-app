import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NoMatch extends Component {

  // componentWillMount() {
  //   if(_.isEmpty(this.props.user)) {
  //     this.props.history.push('/');
  //   }
  // }

  render() {
    return(
      <div className="">
        <h1>Oops, something went wrong</h1>
        <ul className="list-group">
          <li className="list-group-item list-group-item-info">
            <Link to="/">App</Link>
          </li>
          <li className="list-group-item list-group-item-warning">
            <Link to="/SignIn">Sign In</Link>
          </li>
        </ul>
      </div>
    );
  }
}
