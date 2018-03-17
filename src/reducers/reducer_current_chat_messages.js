import _ from 'lodash';
import { FETCH_ALL_DATA_FOR_USER, FETCH_CHAT_DATA, SEND_MESSAGE, DELETE_MESSAGE } from '../actions/types';

export default function(state = [], action) {
  let newState = state;
  switch (action.type) {
    case FETCH_ALL_DATA_FOR_USER:
      return _.values(action.payload.chats.tuta.messages);
    case FETCH_CHAT_DATA:
      return _.values(action.payload.messages);
    case SEND_MESSAGE:
      return _.concat(newState, action.payload);
    case DELETE_MESSAGE:
      return _.without(newState, action.payload);
    default:
      return state;
  }
}
