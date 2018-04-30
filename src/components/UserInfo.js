import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { getCircularProgress } from '../actions/CommonFunctions';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MobileTearSheet from '../../../MobileTearSheet';
import { List, ListItem } from 'material-ui/List';
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
      picture: this.props.user.image,
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
      const { name, email, picture } = this.state;
      const newUser = { uid: this.props.user.uid, name, email, picture }
      this.props.actionUpdateUserData(newUser, () => {
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

  handleChangeImage = (e) => {
    this.setState({ SUimage: e.target.value });
  }

  renderImages() {
    const numOfImages = 8;
    const arrayOfImages = [];
    for (let i = 1; i <= numOfImages; i++) {
      arrayOfImages[i] = `contact${i}.png`;
    }
    arrayOfImages.map((image) => {
      return(
        <ListItem onClick={this.handleChangeImage} primaryText="Sent mail" leftIcon={
          <Avatar size={45} src={require(`../images/${image}`)}
            style={{ borderColor: '#000000', borderStyle: 'solid', borderWidth: 2 }} />
        } />
      );
    });
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
                  hintText="Name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  name="name" />

                <TextField
                  hintText="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  name="email" />

                <div>
                  <MobileTearSheet>
                    <List>
                      {this.renderImages()}
                    </List>
                  </MobileTearSheet>
                </div>

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
