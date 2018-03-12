import { combineReducers } from 'redux';
import User from './reducer_user';
import ChatMessages from './reducer_chat_messages';
import ContactList from './reducer_contact_list';
import CurrentChatUser from './reducer_current_chat_user';

const rootReducer = combineReducers({
  user: User,
  chatMessages: ChatMessages,
  contactList: ContactList,
  currentChatUser: CurrentChatUser
});

export default rootReducer;
