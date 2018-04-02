import React, { Component } from 'react';
import { connect } from 'react-redux';
import fire from '../firebase';
import * as actions from '../actions/index';
import '../css/signIn.css';
import { validateEmail, validatePassword } from '../actions/CommonFunctions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
// import RaisedButton from 'material-ui/RaisedButton';
// import Checkbox from 'material-ui/Checkbox';

class SignInOrSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInMessage: '',
      signUpMessage: '',
      SIemail: '',
      SIpassword: '',
      // SICheck: false,
      SUemail: '',
      SUusername: '',
      SUpassword: '',
      loading: false
    }
  }

  comonentWillMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) { // logged in
        console.log(user);
        // this.props.actionLoginUser(user.username);
        // this.props.history.push('/');
      } else { // NOT logged in
        console.log('not logged in');
        // this.props.actionLogoutUser();
        // this.props.history.push('/SignInOrSignUp');
      }
    });
  }

  handleChange = (e) => {
    var change = {};
    change[e.target.name] = e.target.value;
    this.setState(change, () => {
    });
  }

  // handleChangeCheckBox = () => {
  //   this.setState((oldState) => {
  //     return {
  //       SICheck: !oldState.SICheck
  //     }
  //   });
  // }

  singIn = () => {
    this.setState({ loading: true }, () => {
      let signInMessage = '';
      const { SIemail, SIpassword } = this.state;
      console.log(SIemail, SIpassword);
      fire.auth().signInWithEmailAndPassword(SIemail, SIpassword)
      .then(user => {
        console.log(user);
        signInMessage = `Welcome ${user.email}`;
        this.setState({ loading: false, signInMessage });
        // this.props.history.push('/');
      }).catch(e => {
        signInMessage = e.message;
        this.setState({ loading: false, signInMessage });
      });
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
        console.log('aaaaa');
        fire.auth().createUserWithEmailAndPassword(SUemail, SUpassword)
        .then(user => {
          signUpMessage = `Welcome ${user.email}`;
          console.log(user);
          this.setState({ loading: false, signUpMessage });
          // this.props.history.push('/');
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

  render() {
    return (
      <div className="container container-fluid center">


        <MuiThemeProvider>
          <div className="row">
          { this.state.loading ? <CircularProgress size={80} thickness={5} /> : <span />}
            <div className="col-5">
              <div>
                <h3>Sign In</h3>
                <TextField hintText="Email" name="SIemail"
                  value={this.state.SIemail} onChange={this.handleChange}
                />
                <br />
                <TextField hintText="Password" name="SIpassword" type="password"
                  value={this.state.SIpassword} onChange={this.handleChange}
                />

                <br />
                <p>{this.state.signInMessage}</p>
                <span>forgot my password</span>

                <button className="btn btn-primary"
                  onClick={this.singIn}>
                    Sign In
                </button>


                <br />

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

              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

  // <Checkbox label="Keep Me Signed In" labelPosition="left"
  //   checked={this.state.SICheck} onChange={this.handleChangeCheckBox}
  // />

export default connect(null, actions)(SignInOrSignUp);
