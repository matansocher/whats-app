import React, { Component } from 'react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ListSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleChange = (e) => {
    var change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  render() {
    return (
      <div>
        <input type="text" className="form-control" onChange={this.handleChange}
          placeholder="Search or start new chat" />
      </div>
    );
  }
}

export default ListSearch;
