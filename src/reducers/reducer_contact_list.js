import _ from 'lodash';
import { DELETE_CONTACT_CHAT, FETCH_ALL_DATA_FOR_USER, SEND_MESSAGE, DELETE_MESSAGE, PINUNPIN_CHAT } from '../actions/types';

export default function(state = [], action) {
  let newState = state;
  // console.log(state);
  switch (action.type) {
    case FETCH_ALL_DATA_FOR_USER:
      return _.values(action.payload.chats);
    case DELETE_CONTACT_CHAT:
      return _.without(newState, action.payload);
    case SEND_MESSAGE:
      // const { id, date, hour, content, senderOrReciever } = action.payload;
      // const index = _.findIndex(newState, { name: "tuta" }); // return ron\tuta
      // const newLastMessage = { id, date, hour, content, senderOrReciever };
      // return newState.lastMessage.splice(index, 1, newLastMessage);
      return state;
    case DELETE_MESSAGE:
      // if() {
      //
      // }
      return state;
    case PINUNPIN_CHAT:
      const index = _.findIndex(newState, { name: action.payload.name }); // return ron\tuta
      console.log(newState[index].info);
      console.log(action.payload);
      newState[index].info = action.payload;
      return newState;
    default:
      return state;
  }
}
