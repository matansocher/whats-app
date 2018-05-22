import _ from 'lodash';
import {
  LOGOUT_USER, DELETE_CONTACT_CHAT, FETCH_FRIENDS_LIST, PINUNPIN_CHAT, UNRAED_CHAT
} from '../actions/types';

export default function(state = [], action) {
  let newState = state;
  switch (action.type) {
    case FETCH_FRIENDS_LIST:
      return action.payload;
    case DELETE_CONTACT_CHAT:
      return _.without(state, action.payload);
    case PINUNPIN_CHAT:
    // console.log(JSON.stringify(action.payload))
      const i = _.findIndex(state, { key: action.payload.key }); // return ron\tuta
      // return [...state, [i]: action.payload];
      state[i] = action.payload;
      return state.slice();
    case UNRAED_CHAT:
      const index = _.findIndex(newState, { key: action.payload.key }); // return ron\tuta
      newState[index] = action.payload;
      return newState;
    case LOGOUT_USER:
      return [];
    default:
      return state;
  }
}
