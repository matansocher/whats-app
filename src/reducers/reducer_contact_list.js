import _ from 'lodash';
import {
  LOGOUT_USER, ADD_AS_FRIEND, DELETE_CONTACT_CHAT,
  FETCH_ALL_DATA_FOR_USER, SEND_MESSAGE, DELETE_MESSAGE,
  PINUNPIN_CHAT
} from '../actions/types';

export default function(state = [], action) {
  let newState = state;
  switch (action.type) {
    case FETCH_ALL_DATA_FOR_USER:
      return _.values(action.payload.friends);
    case DELETE_CONTACT_CHAT:
      return _.without(state, action.payload);
    case ADD_AS_FRIEND:
      return [...state, action.payload];
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
