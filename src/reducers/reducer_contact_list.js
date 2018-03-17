import _ from 'lodash';
import { DELETE_CONTACT_CHAT, FETCH_ALL_DATA_FOR_USER } from '../actions/types';

export default function(state = [], action) {
  let newState = state;
  switch (action.type) {
    case FETCH_ALL_DATA_FOR_USER:
      return _.values(action.payload.chats);
    case DELETE_CONTACT_CHAT:
      return _.without(newState, action.payload);
    default:
      return state;
  }
}
