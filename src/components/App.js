import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Chat from './Chat';
import List from './List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <Router>
        <div>
          <div className="container container-fluid">

            <div className="col-sm-4">
              <List />
            </div>

            <div className="col-sm-8">
              <Chat />
            </div>

          </div>
        </div>
      </Router>
    );
  }
}

// export default connect(null, { saveTime })(App);
export default App;

// <Switch>
//   <Route path="/Settings" component={Settings}/>
//   <Route path="/" component={HoursList}/>
//   <Route path="*" component={NoMatch}/>
// </Switch>
