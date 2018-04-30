import React, { Component } from 'react';
import { connect } from 'react-redux';
import fire from '../firebase';
import * as actions from '../actions/index';
import '../css/signIn.css';
import { validateEmail, validatePassword } from '../actions/CommonFunctions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MobileTearSheet from '../../../MobileTearSheet';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
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
      SUimage: '',
      loading: false
    }
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      if(_.isEmpty(this.props.currentChatUser)) {
        this.props.actionFetchImages(() => {
          this.setState({ loading: false });
        });
      }
    });
    
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
      const { SUemail, SUpassword, SUname } = this.state;
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
          signUpMessage = `Welcome ${user.displayName}`;
          this.setState({ loading: false, signUpMessage });
          this.props.actionSignUpUser(SUemail, SUname, SUimage, user.uid, this.updateProfile(user));
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

  handleChangeImage = (e) => {
    this.setState({ SUimage: e.target.value });
  }

  renderImages() {
    // const numOfImages = 8;
    // const arrayOfImages = [];
    // for (let i = 1; i <= numOfImages; i++) {
    //   arrayOfImages[i] = `contact${i}.png`;
    // }
    this.props.images.map((image) => {
      return(
        <ListItem onClick={this.handleChangeImage} primaryText="Sent mail" leftIcon={
          <Avatar size={45} src={require(`../images/${image}`)}
            style={{ borderColor: '#000000', borderStyle: 'solid', borderWidth: 2 }} />
        } />
      );
    });
  }

  render() {
    const style = {
      paper: { display: 'inline-block', float: 'left', margin: '16px 32px 16px 0' }
    };
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
                <TextField hintText="Name" name="SUname"
                  value={this.state.SUname} onChange={this.handleChange}
                />
                <br />
                <TextField hintText="Password" name="SUpassword" type="password"
                  value={this.state.SUpassword} onChange={this.handleChange}
                />
                <br />
                <p>{this.state.signUpMessage}</p>

                <div>
                  <MobileTearSheet>
                    <List>
                      {this.renderImages()}
                    </List>
                  </MobileTearSheet>
                </div>

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

function mapStateToProps(state) {
  return {
    images: state.images
  };
}

export default connect(null, actions)(SignUp);
