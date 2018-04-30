// import _ from 'lodash';
import { FETCH_IMAGES } from '../actions/types';

export default function(state = [], action) {
  // let newState = state;
  switch (action.type) {
    case FETCH_IMAGES:
      return action.payload;
    default:
      return state;
  }
}
