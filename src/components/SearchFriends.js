import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { getCircularProgress, filterBySearch } from '../actions/CommonFunctions';
import _ from 'lodash';
import SearchFriendsItem from './SearchFriendsItem';
import '../css/searchFriends.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import BackIcon from 'material-ui/svg-icons/navigation/chevron-left';

class SearchFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      loading: false
    }
  }

  componentDidMount() {
    if(_.isEmpty(this.props.user)) {
      this.props.history.push('/');
    }
    this.setState({ loading: true }, () => {
      if(_.isEmpty(this.props.searchFriends)) {
        this.props.actionSearchFriends(this.props.user.username, () => {
          this.setState({ loading: false });
        });
      } else {
        this.setState({ loading: false });
      }
    })
  }

  addAsFriend = (friend) => {
    this.setState({ loading: true }, () => {
      const username = this.props.user.name;
      this.props.actionAddAsFriend(username, friend, () => {
        this.setState({ loading: false });
      });
    });
  }

  searchFriends = (searchTerm) => {
    this.setState({ searchTerm });
  }

  backClick = () => {
    this.props.history.push('/');
  }

  handleChange = (e) => {
    var change = {};
    const { value, name } = e.target;
    change[name] = value;
    this.setState(change);
    this.searchFriends(value);
  }

  renderList() {
    let friendsAvailable = _.values(this.props.searchFriends);
    if(this.state.searchTerm !== '' && friendsAvailable && !_.isEmpty(friendsAvailable))
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
    return(
      <div className="container container-fluid center">
        <MuiThemeProvider>
          <div className="row">
            <div className="">
              <div className="center">

                <FlatButton className="pull-left back-button-user-info" label="Back" primary={true}  onClick={this.backClick}>
                  <BackIcon className="pull-left back-user-info" />
                </FlatButton>

                <h1>Search Friends</h1>
                <div className="search-chats">
                  <input className="form-control text-input" placeholder="Search" name="searchTerm"
                    value={this.state.searchTerm} onChange={this.handleChange} />
                </div>
                { this.state.loading ? getCircularProgress() : <span /> }

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
  console.log(state);
  return {
    user: state.user,
    searchFriends: state.searchFriends
  };
}

export default connect(mapStateToProps, actions)(SearchFriends);
