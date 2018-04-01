import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';
import Chats from './components/Chats';
import Conversation from './components/Conversation';
import SignInOrSignUp from './components/SignInOrSignUp';
import NoMatch from './components/NoMatch';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <Switch>
        <Route path="/SignInOrSignUp" component={SignInOrSignUp}/>
        <Route path="/" component={App}/>
        <Route path="/conversation" component={Conversation}/>
        <Route path="*" component={NoMatch}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'));
