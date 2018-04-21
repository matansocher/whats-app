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
      username: this.props.user.name,
      picture: '',
      loading: false
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
      const newUsername = this.state.username;
      this.props.actionUpdateUserData(this.props.user, newUsername, () => {
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
      const { image } = this.props.user;
      return (
        <div>
          <MuiThemeProvider>
            <div>

              <div className="user-info-header">
                <div>
                  <FlatButton className="pull-left back-button-user-info" label="Back" primary={true}  onClick={this.backClick}>
                    <BackIcon className="pull-left back-user-info" />
                  </FlatButton>
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
                  onChange={this.handleChange}
                  name="username" />
              </div>

              <RaisedButton primary={true} label="Update Info" onClick={this.saveClick} />
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
