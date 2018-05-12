import _ from 'lodash';
import {
  LOGOUT_USER, DELETE_CONTACT_CHAT, FETCH_FRIENDS_LIST, PINUNPIN_CHAT
} from '../actions/types';

export default function(state = [], action) {
  let newState = state;
  switch (action.type) {
    case FETCH_FRIENDS_LIST:
      console.log(action.payload)
      return _.values(action.payload);
    case DELETE_CONTACT_CHAT:
      return _.without(state, action.payload);
    case PINUNPIN_CHAT:
      const index = _.findIndex(newState, { name: action.payload.name }); // return ron\tuta
      newState[index].info = action.payload;
      return newState;
    case LOGOUT_USER:
      return [];
    default:
      return state;
  }
}
