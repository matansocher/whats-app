import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import ListSettings from './ListSettings';
import ListSearch from './ListSearch';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  componentDidMount() {

  }

  renderList() {

  }

  render() {
    return (
      <div className="container container-fluid">
        <div className="stick-top">
          <ListSettings user={this.props.user} />
        </div>
        <MuiThemeProvider>
          { this.state.loading ? <CircularProgress size={80} thickness={5} /> : <span />}

          {this.renderList()}
        </MuiThemeProvider>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     contactList: state.contactList,
//     user: state.user
//   };
// }

export default connect(null, actions)(List);
