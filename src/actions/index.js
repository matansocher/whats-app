// import _ from 'lodash';
import fire from '../config';
import {
  SIGNUP_USER,
  LOGIN_USER,
  LOGOUT_USER,
  FETCH_ALL_DATA_FOR_USER, // fetches all the data for a user
  FETCH_CHAT_DATA, // when selecting contact
  // FETCH_USER_DATA,
  // UPDATE_USER_DATA
  SEND_MESSAGE, // send messageto sender and reciever
  DELETE_MESSAGE, // delete individual message
  DELETE_CONTACT_CHAT,
} from '../actions/types';

export function signUpUser(username) {
  const randImg = Math.floor((Math.random() * 8) + 1);
  return dispatch => {
    fire.database().ref(`${username}/info`).set({
      name: username,
      image: `contact${randImg}.png`
    }).then(() => {
      fire.database().ref(`${username}/info`).once('value', snap => {
        const userFromDB = snap.val();
        dispatch({
          type: SIGNUP_USER,
          payload: userFromDB
        });
      });
    });
  };
}

export function loginUser(username) {
  return dispatch => {
    fire.database().ref(`${username}/info`).once('value', snap => {
      const userFromDB = snap.val();
      dispatch({
        type: LOGIN_USER,
        payload: userFromDB
      });
    });
  }
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: null
  }
}

export function fetchAllDataForUser(username) {
  return dispatch => {
    fire.database().ref(`${username}`).once('value', snap => {
      const allDataForUser = snap.val();
      dispatch({
        type: FETCH_ALL_DATA_FOR_USER,
        payload: allDataForUser
      });
    });
  }
}

// export function fetchUserData(user) {
//
//   return dispatch => {
//     fire.database().ref(`${user}/info`).once('value', snap => {
//       const userData = snap.val();
//       dispatch({
//         type: FETCH_USER_DATA,
//         payload: userData
//       });
//     });
//   }
// }

// export function updateUserData(user) {
//   const { username } = user;
//   return dispatch => {
//     fire.database().ref(`${username}/info`).set({
//       username
//     });
//     dispatch({
//       type: UPDATE_USER_DATA,
//       payload: user
//     });
//   }
// }

export function sendMessage(sender, reciever, message) {
  const { id, content, date, hour } = message;
  return dispatch => {
    // problem in message - should be message id or something
    fire.database().ref(`${sender}/chats/${reciever}/messages/${message.id}`).set({
      id,
      content,
      date,
      hour,
      senderOrReciever: 1
    }).then(() => {
      fire.database().ref(`${reciever}/chats/${sender}/messages/${message.id}`).set({
        id,
        content,
        date,
        hour,
        senderOrReciever: 2
      }).then(() => {
        dispatch({
          type: SEND_MESSAGE,
          payload: message
        });
      });
    })
  }
}

export function deleteMessage(username, contact, message) {
  return dispatch => {
    fire.database().ref(`${username}/chats/${contact}/messages/${message.id}`).remove().then(() => {
      fire.database().ref(`${contact}/chats/${username}/messages/${message.id}`).remove();
      // callback();
    });
    dispatch({
      type: DELETE_MESSAGE,
      payload: message
    });
  }
}

export function fetchChatData(username, contactName) {
  return dispatch => {
    fire.database().ref(`${username}/chats/${contactName}`).once('value', snap => {
      const messages = snap.val();
      dispatch({
        type: FETCH_CHAT_DATA,
        payload: messages
      });
    });
  }
}

export function deleteContactChat(username, contact) {
  return dispatch => {
    fire.database().ref(`${username}/chats/${contact.info.name}`).remove().then(() => {
      // callback();
    });
    dispatch({
      type: DELETE_CONTACT_CHAT,
      payload: contact
    });
  }
}
