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

  componentDidMount(prevProps, prevState, snapshot) {
    // fire.auth().onAuthStateChanged(user => {
    //   if (user) { // logged in
    //     this.updateProfileAndLogin(user);
    //   }
      // else { // NOT logged in
      //   console.log('not logged in');
      //   this.props.actionLogoutUser();
      //   this.props.history.push('/SignIn');
      // }
    // });
  }

  updateProfileAndLogin = (user) => {
    const { SUemail, SUusername } = this.state;
    console.log(SUusername);
    user.updateProfile({ displayName: SUusername }).then(() => {
      console.log(user);
      this.props.history.push('/');
    }, error => {
      console.log(error);
    });
  }

  singUp = () => {
    this.setState({ loading: true }, () => {
      let signUpMessage = '';
      const { SUemail, SUpassword, SUusername } = this.state;
      console.log(SUemail, SUpassword, SUusername);
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
          console.log(user);
          this.setState({ loading: false, signUpMessage });
          this.props.actionSignUpUser(SUemail, SUusername);
          this.updateProfileAndLogin(user);
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
