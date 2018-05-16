import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { getCircularProgress, filterBySearch } from '../actions/CommonFunctions';
import _ from 'lodash';
import SearchFriendsItem from './SearchFriendsItem';
import '../css/searchFriends.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import { List } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import BackIcon from 'material-ui/svg-icons/navigation/chevron-left';

class SearchFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      gesture: false,
      gestureText: "",
      loading: false
    }
  }

  componentDidMount() {
    if (_.isEmpty(this.props.user)) {
      this.props.history.push('/');
      return;
    }

    if (_.isEmpty(this.props.searchFriends)) {
      this.setState({ loading: true }, () => {
        const { uid } = this.props.user;
        const friendsUids = _.map(this.props.contactList, f => f.key);
        friendsUids.push(uid); // this user
        this.props.actionSearchFriends(uid, friendsUids, () => {
          this.setState({ loading: false });
        });
      });
    }
  }

  addAsFriend = (friend) => {
    this.setState({ loading: true }, () => {
      this.props.actionAddAsFriend(this.props.user.uid, friend, () => {
        this.setState({ loading: false, gestureText: "Friend Was Added Successfully", gesture: true });
      });
    });
  }

  searchFriends = (searchTerm) => {
    this.setState({ searchTerm });
  }

  backClick = () => {
    this.props.history.push('/');
  }

  handleRequestClose = () => {
    this.setState({ gesture: false });
  };

  handleChange = (e) => {
    var change = {};
    const { value, name } = e.target;
    change[name] = value;
    this.setState(change);
    this.searchFriends(value);
  }

  renderList() {
    if (_.isEmpty(this.props.searchFriends)) {
      return (
        <div className="center">
          <h3>You have no more friends to add</h3>
        </div>
      );
    }
    let friendsAvailable = _.values(this.props.searchFriends);
    if (this.state.searchTerm !== '' && friendsAvailable && !_.isEmpty(friendsAvailable))
      friendsAvailable = filterBySearch(friendsAvailable, this.state.searchTerm);
    return (
      friendsAvailable.map((friend) => {
        return (
          <SearchFriendsItem key={friend.email}
            friend={friend} addAsFriend={this.addAsFriend} />
        )
      })
    );
  }

  render() {
    return (
      <div className="center">
        <MuiThemeProvider>
          <div className="row">
            <div className="">
              <div className="center">

                <Snackbar open={this.state.gesture} message={this.state.gestureText}
                  autoHideDuration={4000} onRequestClose={this.handleRequestClose} />


                <FlatButton className="pull-left back-button-user-info" label="Back" primary={true} onClick={this.backClick}>
                  <BackIcon className="pull-left back-user-info" />
                </FlatButton>

                <h1>Search Friends</h1>
                <div className="search-chats">
                  <input className="form-control text-input" placeholder="Search" name="searchTerm"
                    value={this.state.searchTerm} onChange={this.handleChange} />
                </div>
                {this.state.loading ? getCircularProgress() : <span />}

                <List>
                  {this.renderList()}
                </List>

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
    user: state.user,
    contactList: state.contactList,
    searchFriends: state.searchFriends
  };
}

export default connect(mapStateToProps, actions)(SearchFriends);
