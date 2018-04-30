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

  singIn = () => {
    this.setState({ loading: true }, () => {
      let signInMessage = '';
      const { SIemail, SIpassword } = this.state;
      fire.auth().signInWithEmailAndPassword(SIemail, SIpassword).then(user => {
        signInMessage = `Welcome ${user.displayName}`;
        this.setState({ loading: false, signInMessage });
        this.props.actionLoginUser(user.uid);
        this.props.history.push('/');
      }).catch(e => {
        signInMessage = e.message;
        this.setState({ loading: false, signInMessage });
      });
    });
  }

  signUpClick = () => {
    this.props.history.push('SignUp');
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

                <br /><br />

                {this.state.signInMessage ? 
                  <div className="alert alert-danger">
                    <strong>{this.state.signInMessage}</strong>
                  </div> 
                : <span />}

                <br />

                <button className="btn btn-primary"
                  onClick={this.singIn}>
                    Sign In
                </button>

                <FlatButton label="Sign Up For Whats-app" primary={true}
                  onClick={this.signUpClick} />

              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(null, actions)(SignIn);
