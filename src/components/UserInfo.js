import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { getCircularProgress } from '../actions/CommonFunctions';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import BackIcon from 'material-ui/svg-icons/navigation/chevron-left';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user.info.name,
      picture: '',
      loading: true
    }
  }

  componentWillMount() {
    if(_.isEmpty(this.props.user)) {
      this.props.history.push('/');
    }
  }

  backClick = () => {
    this.props.history.push('/');
  }

  saveClick = () => {
    this.setState({ loading: true }, () => {
      const { username } = this.state;
      const user = { username };
      this.props.actionUpdateUserData(user, () => {
        this.setState({ loading: false });
      });
    })
  }

  handleChange = (e) => {
    var change = {};
    const { value, name } = e.target;
    change[name] = value;
    this.setState(change);
  }

  render() {
    if(this.state.loading) {
      return getCircularProgress();
    } else {
      const { image } = this.props.user.info;
      return (
        <div>
          <MuiThemeProvider>
            <div>

              <div className="user-info-header">
                <div className="pull-left">
                  <BackIcon onClick={this.backClick} />
                  <FlatButton label="Primary" primary={true} />
                </div>

                <div className="center">
                  <h1>Edit Profile</h1>
                </div>
              </div>

              { this.state.loading ? getCircularProgress() : <span /> }

              <br />

              <div className="center">
                <Avatar size={90} src={require(`../images/${image}`)} />

                <TextField
                  hintText="Username"
                  value={this.state.username}
                  name="username"
                  fullWidth={true} />
              </div>

              <RaisedButton primary={true} label="Update Info" fullWidth={true} />
            </div>
          </MuiThemeProvider>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, actions)(UserInfo);
