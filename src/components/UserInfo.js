import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { getCircularProgress } from '../actions/CommonFunctions';
import _ from 'lodash';
import AvatarPicker from './AvatarPicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import BackIcon from 'material-ui/svg-icons/navigation/chevron-left';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      email: this.props.user.email,
      avatar: this.props.user.avatar,
      gesture: false,
      gestureText: "",
      loading: false
    }
  }

  componentWillMount() {
    if (_.isEmpty(this.props.user)) {
      this.props.history.push('/');
    }
  }

  componentDidMount() {
    if(_.isEmpty(this.props.avatars)) {
      this.setState({ lodaing: true }, () => {
        this.props.actionFetchAvatars(() => {
          this.setState({ lodaing: false });
        });
      });
    }
  }

  backClick = () => {
    this.props.history.push('/');
  }

  saveClick = () => {
    this.setState({ loading: true }, () => {
      const { name, email, avatar } = this.state;
      const { uid } = this.props.user;
      const newUser = { uid, name, email, avatar, lastSeen: "Online" };
      console.log(newUser)
      this.props.actionUpdateUserData(newUser, () => {
        this.setState({ loading: false, gestureText: "Changes Saved Successfully", gesture: true });
      });
    })
  }

  handleRequestClose = () => {
    this.setState({ gesture: false });
  };

  handleChange = (e) => {
    var change = {};
    const { value, name } = e.target;
    change[name] = value;
    this.setState(change);
  }

  changeAvatar = (avatar) => {
    this.setState({ avatar });
  }

  render() {
    if (_.isEmpty(this.props.user)) {
      return getCircularProgress();
    } else {
      return (
        <div>
          <MuiThemeProvider>
            <div>

              <Snackbar open={this.state.gesture} message={this.state.gestureText}
                autoHideDuration={4000} onRequestClose={this.handleRequestClose} />

              <div className="user-info-header">
                <div>
                  <FlatButton className="pull-left back-button-user-info" label="Back" primary={true} onClick={this.backClick}>
                    <BackIcon className="pull-left back-user-info" />
                  </FlatButton>
                </div>

                <div className="center">
                  <h1>Edit Profile</h1>
                </div>
              </div>

              {this.state.loading ? getCircularProgress() : <span />}

              <br />

              <div className="center">
                <Avatar size={90} src={require(`../avatars/${this.state.avatar}`)} />

                <br />

                <TextField
                  hintText="Name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  name="name" />

                <br />

                <TextField
                  hintText="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  name="email" />

                <AvatarPicker avatars={this.props.avatars} avatar={this.state.avatar}
                  changeAvatar={this.changeAvatar} />

                <RaisedButton primary={true} label="Update Info" onClick={this.saveClick} />
              </div>
            </div>
          </MuiThemeProvider>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    avatars: state.avatars
  };
}

export default connect(mapStateToProps, actions)(UserInfo);
