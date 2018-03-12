import _ from 'lodash';
import { CHANGE_CHAT } from '../actions/types';

export default function(state = [], action) {
  let newState = state;
  switch (action.type) {
    case CHANGE_CHAT:
      return action.payload;
    default:
      return state;
  }
}
