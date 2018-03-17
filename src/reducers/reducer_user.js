// import _ from 'lodash';
import { LOGIN_USER, LOGOUT_USER, FETCH_ALL_DATA_FOR_USER } from '../actions/types';

export default function(state = {}, action) {
  // let newState = state;
  switch (action.type) {
    case FETCH_ALL_DATA_FOR_USER:
      return action.payload.info;
    case LOGIN_USER:
      return action.payload;
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
}
