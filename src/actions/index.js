// import _ from 'lodash';
import fire from '../firebase';
import {
  SIGNUP_USER,
  LOGIN_USER,
  LOGOUT_USER,
  FETCH_ALL_DATA_FOR_USER, // fetches all the data for a user
  FETCH_CHAT_DATA, // when selecting contact
  UPDATE_USER_DATA, // update the user data
  SEND_MESSAGE, // send messageto sender and reciever
  DELETE_MESSAGE, // delete individual message
  DELETE_CONTACT_CHAT,
} from '../actions/types';

export function actionSignUpUser(username) {
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

export function actionLoginUser(username) {
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

export function actionLogoutUser() {
  return {
    type: LOGOUT_USER,
    payload: null
  }
}

export function actinoFetchAllDataForUser(username, callback) {
  return dispatch => {
    fire.database().ref(`${username}`).once('value', snap => {
      const allDataForUser = snap.val();
      callback();
      dispatch({
        type: FETCH_ALL_DATA_FOR_USER,
        payload: allDataForUser
      });
    });
  }
}

export function actionUpdateUserData(user, callback) {
  const { username } = user;
  return dispatch => {
    fire.database().ref(`${username}/info`).set({
      name: username
    }).then(() => {
      fire.database().ref(`${username}`).set({
        name: username
      });
      callback();
    });
    dispatch({
      type: UPDATE_USER_DATA,
      payload: user
    });
  }
}

export function actionSendMessage(sender, reciever, message, callback) {
  const { id, content, date, hour } = message;
  return dispatch => {
    fire.database().ref(`${sender}/chats/${reciever}/messages/${message.id}`).set({
      id, content, date, hour, senderOrReciever: 1
    }).then(() => {
      fire.database().ref(`${reciever}/chats/${sender}/messages/${message.id}`).set({
        id, content, date, hour, senderOrReciever: 2
      })
    }).then(() => {
      fire.database().ref(`${sender}/chats/${reciever}/lastMessage/`).set({
        id, content, date, hour, senderOrReciever: 1
      })
    }).then(() => {
      fire.database().ref(`${reciever}/chats/${sender}/lastMessage/`).set({
        id, content, date, hour, senderOrReciever: 2
      })
    }).then(() => {
      callback();
      dispatch({
        type: SEND_MESSAGE,
        payload: message
      });
    });
  }
}

export function actionDeleteMessage(username, contact, message, callback) {
  return dispatch => {
    fire.database().ref(`${username}/chats/${contact}/messages/${message.id}`).remove().then(() => {
      fire.database().ref(`${contact}/chats/${username}/messages/${message.id}`).remove();
      callback();
    });
    dispatch({
      type: DELETE_MESSAGE,
      payload: message
    });
  }
}

export function actionFetchChatData(username, contactName, callback) {
  return dispatch => {
    fire.database().ref(`${username}/chats/${contactName}`).once('value', snap => {
      const messages = snap.val();
      callback();
      dispatch({
        type: FETCH_CHAT_DATA,
        payload: messages
      });
    });
  }
}

export function actionDeleteContactChat(username, contact, callback) {
  return dispatch => {
    fire.database().ref(`${username}/chats/${contact.info.name}`).remove().then(() => {
      callback();
    });
    dispatch({
      type: DELETE_CONTACT_CHAT,
      payload: contact
    });
  }
}
