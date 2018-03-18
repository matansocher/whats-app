import React, { Component } from 'react';
import { connect } from 'react-redux';
import fire from '../config';
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
      SIusername: '',
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
      if (user) {
        console.log(user);
        // this.props.history.push('/');
      } else {
        console.log('not logged in');
        // this.props.history.push('/SignInOrSignUp');
      }
    });
  }

    handleChange = (e) => {
      var change = {};
      change[e.target.name] = e.target.value;
      this.setState(change);
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
        const { SIemail, SIpassword, SIusername } = this.refs;
        const email = SIemail.value;
        const password = SIpassword.value;
        const username = SIusername.value;
        console.log(email, username, password);
        fire.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user);
          const signInMessage = `Welcome ${user.email}`;
          this.setState({ loading: false, signInMessage });
          // this.props.history.push('/');
        }).error(e => {
          const signInMessage = e.message;
          this.setState({ loading: false, signInMessage });
        });
      });
    }

    singUp = () => {
      this.setState({ loading: true }, () => {
        let signUpMessage = '';
        const { SUemail, SUpassword, SUusername } = this.refs;
        const email = SUemail.value;
        const password = SUpassword.value;
        const username = SUusername.value;
        console.log(email, username, password);
        if(validatePassword(password) === 'short') {
          signUpMessage = `Password should contain at least 6 chars`;
          this.setState({ loading: false, signUpMessage });
          return;
        }
        if(!username || username.length === 0) {
          signUpMessage = `Username is empty`;
          this.setState({ loading: false, signUpMessage });
          return;
        }
        if(validateEmail(email) && validatePassword(password)) {
          fire.auth().createUserWithEmailAndPassword(email, password)
          .then(user => {
            signUpMessage = `Welcome ${user.email}`;
            console.log(user);
            this.setState({ loading: false, signUpMessage });
            // this.props.history.push('/');
          }).error(e => {
            signUpMessage = e.message;
            this.setState({ loading: false, signUpMessage });
          });
        }
      });
    }

    render() {
      return (
        <div className="container container-fluid center">

          { this.state.loading ? <CircularProgress size={80} thickness={5} /> : <span />}

          <MuiThemeProvider>
            <div className="row">
              <div className="col-5">
                <div>
                  <h3>Sign In</h3>
                  <TextField hintText="Email" name="SIemail"
                    value={this.state.SIemail} onChange={this.handleChange}
                  />
                  <br />
                  <TextField hintText="Username" name="SIusername"
                    value={this.state.SIusername} onChange={this.handleChange}
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
