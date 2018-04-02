import _ from 'lodash';
import { DELETE_CONTACT_CHAT, FETCH_ALL_DATA_FOR_USER, SEND_MESSAGE, DELETE_MESSAGE } from '../actions/types';

export default function(state = [], action) {
  let newState = state;
  // console.log(action.payload);
  switch (action.type) {
    case FETCH_ALL_DATA_FOR_USER:
      return _.values(action.payload.chats);
    case DELETE_CONTACT_CHAT:
      return _.without(newState, action.payload);
    case SEND_MESSAGE:
      const index = _.findIndex(newState, { name: "tuta" }); // return ron\tuta
      const { id, date, hour, content, senderOrReciever } = action.payload;
      const newLastMessage = { id, date, hour, content, senderOrReciever }
      return newState.lastMessage.splice(index, 1, newLastMessage);
    case DELETE_MESSAGE:
      // if() {
      //
      // }
      // return state;
      // TODO
    default:
      return state;
  }
}
