import React, { Component } from 'react';
import { connect } from 'react-redux';
import fire from '../firebase';
import * as actions from '../actions/index';
import '../css/signIn.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SIemail: '',
      SIpassword: '',
      loading: false
    }
  }

  componentDidMount(prevProps, prevState, snapshot) {
    fire.auth().onAuthStateChanged(user => {
      if (user) { // logged in
        this.loginAfterSignIn(user);
      } else { // NOT logged in
        console.log('not logged in');
        this.props.actionLogoutUser();
        this.props.history.push('/SignIn');
      }
    });
  }

  loginAfterSignIn = (user) => {
    const { SIemail } = this.state;
    console.log(SIemail);
    const displayName = SIemail;
    console.log(user);
    this.props.actionLoginUser(user.username);
    this.props.history.push('/');
  }

  singIn = () => {
    this.setState({ loading: true }, () => {
      let signInMessage = '';
      const { SIemail, SIpassword } = this.state;
      fire.auth().signInWithEmailAndPassword(SIemail, SIpassword)
      .then(user => {
        signInMessage = `Welcome ${user.displayName}`;
        this.setState({ loading: false, signInMessage, inOrUp: 1 });
        this.props.actionLoginUser(SIemail, SIpassword);
      }).catch(e => {
        signInMessage = e.message;
        this.setState({ loading: false, signInMessage });
      });
    });
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

                <button className="btn btn-primary"
                  onClick={this.singIn}>
                    Sign In
                </button>

                <FlatButton label="Sign Up For Whats-app" primary={true}
                  onClick={this.toggleInOrUp} />

              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(null, actions)(SignIn);
