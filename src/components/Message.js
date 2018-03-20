import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import '../css/Message.css';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  deleteMessage = () => {
    this.props.deleteMessage(this.props.message);
  }

  render() {
    console.log(this.props.message);
    return (
      <div className="message">
        <MuiThemeProvider>
          <div className="three-dots-father">
            <div className="message sent">
              No I wasnt.
              <span className="metadata">
                  <span className="time">11:11</span><span className="tick"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg></span>
              </span>
            </div>

            // <span>{this.props.message.content}</span>
            // <br />
            // <span>{this.props.message.hour}</span>

            <IconMenu
              className="three-dots-left"
              iconButtonElement={<IconButton><MoreIcon /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Reply Message" />
              <MenuItem primaryText="Forward Message" />
              <MenuItem primaryText="Star Message" />
              <MenuItem primaryText="Delete Message" onClick ={this.deleteMessage} />
            </IconMenu>
          </div>
        </MuiThemeProvider>
        <br /><br />
      </div>
    );
  }
}

export default Message;
