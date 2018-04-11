import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { getCircularProgress } from '../actions/CommonFunctions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import BackIcon from 'material-ui/svg-icons/navigation/chevron-left';

class ContactInfo extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      username: this.props.currentChatUser.name,
      picture: '',
      loading: false
    }
  }

  backClick = () => {
    this.props.history.push('/conversation');
  }

  render() {
    if(this.state.loading) {
      return getCircularProgress();
    } else {
      const { image, name } = this.props.currentChatUser;
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
                  <h1>{`${name}'s`} Profile</h1>
                </div>
              </div>

              <br />

              <div className="center">
                <Avatar size={90} src={require(`../images/${image}`)} />
                <br />
                <h2>{name}</h2>
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
    currentChatUser: state.currentChatUser
  };
}

export default connect(mapStateToProps, actions)(ContactInfo);
