import React, { Component } from 'react';
import { connect } from 'react-redux';
// import fire from '../firebase';
import * as actions from '../actions/index';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { getCircularProgress } from '../actions/CommonFunctions';
// import TextField from 'material-ui/TextField';
// import FlatButton from 'material-ui/FlatButton';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount() {
    if (_.isEmpty(this.props.settings)) {
      this.props.history.push('/');
    }
  }

  handleChange = (e) => {
    var change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="row">
          { this.state.loading ? getCircularProgress() : <span />}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, actions)(Settings);
