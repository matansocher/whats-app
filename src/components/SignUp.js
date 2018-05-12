import React, { Component } from 'react';
import { connect } from 'react-redux';
import fire from '../firebase';
import * as actions from '../actions/index';
import _ from 'lodash';
import AvatarPicker from './AvatarPicker';
import { validateEmail, validatePassword } from '../actions/CommonFunctions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SUemail: '',
      SUname: '',
      SUpassword: '',
      SUavatar: 'default.png',
      loading: false
    }
  }

  componentDidMount() {
    if(_.isEmpty(this.props.currentChatUser)) {
      this.setState({ loading: true }, () => {
        this.props.actionFetchAvatars(() => {
          this.setState({ loading: false });
        });
      });
    }
  }
  
  updateProfile = (user) => {
    const { SUname } = this.state;
    console.log(user);
    user.updateProfile({ displayName: SUname }).then(() => {
      this.props.history.push('/');
    }, error => {
      console.log(error);
    });
  }

  singUp = () => {
    this.setState({ loading: true }, () => {
      let signUpMessage = '';
      const { SUemail, SUpassword, SUname, SUavatar } = this.state;
      if(validatePassword(SUpassword) === 'short') {
        signUpMessage = `Password should contain at least 6 chars`;
        this.setState({ loading: false, signUpMessage });
        return;
      }
      if(!SUname || SUname.length === 0) {
        signUpMessage = `Name is empty`;
        this.setState({ loading: false, signUpMessage });
        return;
      }
      if(validateEmail(SUemail) && validatePassword(SUpassword)) {
        fire.auth().createUserWithEmailAndPassword(SUemail, SUpassword)
        .then(user => {
          this.props.actionSignUpUser(SUemail, SUname, SUavatar, user.uid, () => {
            this.updateProfile(user)
          });
        }).catch(e => {
          signUpMessage = e.message;
          this.setState({ loading: false, signUpMessage });
        });
      } else {
        signUpMessage = `Oops, something went wrong, please try again`;
        this.setState({ loading: false, signUpMessage });
      }
    });
  }

  signInClick = () => {
    this.props.history.push('SignIn');
  }

  handleChange = (e) => {
    var change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  changeAvatar = (SUavatar) => {
    console.log(SUavatar);
    this.setState({ SUavatar });
  }

  render() {
    return (
      <div className="cetner-sign-in">
        <MuiThemeProvider>
          <div className="row">
            <div className="col-5">
              <div>
                { this.state.loading ? <CircularProgress size={80} thickness={5} /> : <span />}
                <h3>Create An Acount</h3>
                <TextField hintText="Email" name="SUemail"
                  value={this.state.SUemail} onChange={this.handleChange} />
                <br />
                <TextField hintText="Name" name="SUname"
                  value={this.state.SUname} onChange={this.handleChange} />
                <br />
                <TextField hintText="Password" name="SUpassword" type="password"
                  value={this.state.SUpassword} onChange={this.handleChange} />
                <br />
                <p>{this.state.signUpMessage}</p>

                <AvatarPicker avatar={this.state.SUavatar}
                  changeAvatar={this.changeAvatar} />

                <button className="btn btn-primary"
                  onClick={this.singUp}>
                    Sign Up
                </button>

                <FlatButton label="Already A Member? Sign In" primary={true}
                  onClick={this.signInClick} />

                

              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(null, actions)(SignUp);