import { combineReducers } from 'redux';
import User from './reducer_user';
import ContactList from './reducer_contact_list';
import CurrentChatUser from './reducer_current_chat_user';
import CurrentChatMessages from './reducer_current_chat_messages';
import SearchFriends from './reducer_search_friends';
import Images from './reducer_images';

const rootReducer = combineReducers({
  user: User,
  contactList: ContactList,
  currentChatUser: CurrentChatUser,
  currentChatMessages: CurrentChatMessages,
  searchFriends: SearchFriends,
  images: Images
});

export default rootReducer;
