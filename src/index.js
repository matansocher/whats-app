import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Chats from './components/Chats';
import Conversation from './components/Conversation';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserInfo from './components/UserInfo';
import ContactInfo from './components/ContactInfo';
import SearchFriends from './components/SearchFriends';
import Settings from './components/Settings';
import NoMatch from './components/NoMatch';
import './css/index.css';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/Settings" component={Settings}/>
        <Route path="/SearchFriends" component={SearchFriends}/>
        <Route path="/SignIn" component={SignIn}/>
        <Route path="/SignUp" component={SignUp}/>
        <Route path="/UserInfo" component={UserInfo}/>
        <Route path="/ContactInfo" component={ContactInfo}/>
        <Route path="/conversation" component={Conversation}/>
        <Route path="/" component={Chats}/>
        <Route path="*" component={NoMatch}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'));
