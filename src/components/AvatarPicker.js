import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import * as actions from '../actions/index';
import _ from 'lodash';
import { getAvatarsNames } from '../actions/CommonFunctions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
// import Paper from 'material-ui/Paper';
// import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import { AvatarProps } from 'material-ui';

class AvatarPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // avatar: this.props.avatar
    }
  }

  getAvatarsFromNames = () => {
    const arrayOfElements = [];
    const avatarNames = getAvatarsNames();
    avatarNames.map(avatarName => {
      const element = {
        text: avatarName,
        value: (
          <MenuItem key={avatarName} value={avatarName} onClick={this.handleChange}
            rightIcon={
              <Avatar size={75} src={require(`../avatars/${avatarName}`)}
                style={{ borderColor: '#000000', borderStyle: 'solid', borderWidth: 2 }} />
            }
          />
        )
      }
      arrayOfElements.push(element);
    });
    return arrayOfElements;
  }

  handleChange = (e) => {
    console.log(e)
    console.log(e.target)
    console.log(e.target.value)

    // this.props.changeAvatar(e.target.value);
  }

  // handleChange = (e) => {
  //   console.log(e.target);
  // // this.setState({ avatar: e.target.value });

  //   this.props.changeAvatar(e.target.value);
  // }

  // renderAvatars() {
  //   if (_.isEmpty(this.props.avatars)) {
  //     return <span />;
  //   }
  //   console.log(this.props.avatars);
  //   return (
  //     this.props.avatars.map(avatar => {
  //       return (
  //         <MenuItem key={avatar} value={avatar}
  //           rightIcon={
  //             <Avatar size={75} src={require(`../avatars/${avatar}`)}
  //               style={{ borderColor: '#000000', borderStyle: 'solid', borderWidth: 2 }} />
  //           }
  //         />
  //       );
  //     })
  //   );
  // }

  render() {
    return (
      <div className="center">
        <MuiThemeProvider>
          <AutoComplete
            floatingLabelText="Pick Avatar"
            filter={AutoComplete.noFilter}
            openOnFocus={true}
            dataSource={this.getAvatarsFromNames()}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default AvatarPicker;

// function mapStateToProps(state) {
//   return {
//     avatars: state.avatars
//   };
// }

// export default connect(mapStateToProps, actions)(AvatarPicker);

/* <Paper>
  <Menu value={this.props.avatar} desktop={true} width={100}
    onItemClick={this.handleChange} >
    {this.renderAvatars()}
  </Menu>
</Paper> */