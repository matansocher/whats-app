import _ from 'lodash';
import { AAA } from '../actions/types';

export default function(state = [], action) {
  let newState = state;
  switch (action.type) {
    case FETCH_CHATS_FOR_USER:
      return action.payload;
    case DELETE_CONTACT_CHAT:
      return _.without(newState, action.payload);
    default:
      return state;
  }
}
