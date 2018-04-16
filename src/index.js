import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Chats from './components/Chats';
import Conversation from './components/Conversation';
import SignInOrSignUp from './components/SignInOrSignUp';
import UserInfo from './components/UserInfo';
import ContactInfo from './components/ContactInfo';
import NoMatch from './components/NoMatch';
import './css/index.css';
import { LOGIN_USER } from '../actions/types';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}}>
    <Router>
      <Switch>
        <Route path="/SignInOrSignUp" component={SignInOrSignUp}/>
        <Route path="/UserInfo" component={UserInfo}/>
        <Route path="/ContactInfo" component={ContactInfo}/>
        <Route path="/conversation" component={Conversation}/>
        <Route path="/" component={Chats}/>
        <Route path="*" component={NoMatch}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'));
