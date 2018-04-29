import React, { Component } from 'react';
import { connect } from 'react-redux';
import fire from '../firebase';
import * as actions from '../actions/index';
import '../css/signIn.css';
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
      SUusername: '',
      SUpassword: '',
      loading: false
    }
  }

  updateProfile = (user) => {
    const { SUusername } = this.state;
    console.log(user);
    user.updateProfile({ displayName: SUusername }).then(() => {
      this.props.history.push('/');
    }, error => {
      console.log(error);
    });
  }

  singUp = () => {
    this.setState({ loading: true }, () => {
      let signUpMessage = '';
      const { SUemail, SUpassword, SUusername } = this.state;
      if(validatePassword(SUpassword) === 'short') {
        signUpMessage = `Password should contain at least 6 chars`;
        this.setState({ loading: false, signUpMessage });
        return;
      }
      if(!SUusername || SUusername.length === 0) {
        signUpMessage = `Username is empty`;
        this.setState({ loading: false, signUpMessage });
        return;
      }
      if(validateEmail(SUemail) && validatePassword(SUpassword)) {
        fire.auth().createUserWithEmailAndPassword(SUemail, SUpassword)
        .then(user => {
          signUpMessage = `Welcome ${user.displayName}`;
          this.setState({ loading: false, signUpMessage });
          this.updateProfile(user);
          this.props.actionSignUpUser(SUemail, SUusername, user.uid);
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
    this.setState(change, () => {
    });
  }

  render() {
    return (
      <div className="container container-fluid center">
        <MuiThemeProvider>
          <div className="row">
            <div className="col-5">
              <div>
                { this.state.loading ? <CircularProgress size={80} thickness={5} /> : <span />}
                <h3>Create An Acount</h3>
                <TextField hintText="Email" name="SUemail"
                  value={this.state.SUemail} onChange={this.handleChange}
                />
                <br />
                <TextField hintText="Username" name="SUusername"
                  value={this.state.SUusername} onChange={this.handleChange}
                />
                <br />
                <TextField hintText="Password" name="SUpassword" type="password"
                  value={this.state.SUpassword} onChange={this.handleChange}
                />
                <br />
                <p>{this.state.signUpMessage}</p>

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
