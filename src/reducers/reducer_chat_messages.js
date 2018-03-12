import _ from 'lodash';
import { AAA } from '../actions/types';

export default function(state = [], action) {
  let newState = state;
  switch (action.type) {
    case FETCH_MESSAGES_FOR_CHAT:
      return action.payload;
    case SEND_MESSAGE:
      return _.concat(newState, action.payload);
    case DELETE_MESSAGE:
      return _.without(newState, action.payload);
    default:
      return state;
  }
}
