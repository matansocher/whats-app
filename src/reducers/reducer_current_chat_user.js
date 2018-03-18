// import _ from 'lodash';
import { FETCH_ALL_DATA_FOR_USER, FETCH_CHAT_DATA } from '../actions/types';

export default function(state = {}, action) {
  let newState = state;
  switch (action.type) {
    case FETCH_ALL_DATA_FOR_USER:
      return action.payload.chats.tuta.info;
    case FETCH_CHAT_DATA:
      return action.payload.info;
    default:
      return state;
  }
}
