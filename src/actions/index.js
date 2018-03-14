// import _ from 'lodash';
import fire from '../config';
import {
  SIGNUP_USER,
  LOGIN_USER,
  LOGOUT_USER,
  FETCH_USER_DATA,
  UPDATE_USER_DATA,
  SEND_MESSAGE,
  DELETE_MESSAGE,
  CHANGE_CHAT,
  FETCH_CHATS_FOR_USER,
  FETCH_MESSAGES_FOR_CHAT,
  DELETE_CONTACT_CHAT } from '../actions/types';

export function signUpUser(user) {

  return dispatch => {
    // callback();
    dispatch({
      type: SIGNUP_USER,
      payload: user
    });
  }
}

export function loginUser(user) {

  return dispatch => {
    // callback();
    dispatch({
      type: LOGIN_USER,
      payload: user
    });
  }
}

export function logoutUser(user) {

  return dispatch => {
    // callback();
    dispatch({
      type: LOGOUT_USER,
      payload: user
    });
  }
}

export function fetchUserData(user) {

  return dispatch => {
    fire.database().ref(`${user}/info`).once('value', snap => {
      const userData = snap.val();
      dispatch({
        type: FETCH_USER_DATA,
        payload: userData
      });
    });
  }
}

export function updateUserData(user) {
  const { username } = user;
  return dispatch => {
    fire.database().ref(`${username}/info`).set({
      username
    });
    dispatch({
      type: UPDATE_USER_DATA,
      payload: user
    });
  }
}

export function sendMessage(sender, reciever, message) {
  const { content, date, hour } = message;
  return dispatch => {
    fire.database().ref(`${sender}/chats/${reciever}/${message}`).set({
      content,
      date,
      hour,
      senderOrReciever: 1
    }).then(() => {
      fire.database().ref(`${reciever}/chats/${sender}/${message}`).set({
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

export function deleteMessage(user, contact, message) {

  return dispatch => {
    fire.database().ref(`${user}/chats/${contact}/${message}`).remove().then(() => {
      // callback();
    });
    dispatch({
      type: DELETE_MESSAGE,
      payload: message
    });
  }
}

export function changeChat(user, contact) {

  return dispatch => {
    fire.database().ref(`${user}/chats/${contact}`).once('value', snap => {
      const chatData = snap.val();
      // callback();
      dispatch({
        type: CHANGE_CHAT,
        payload: chatData
      });
    });
  }
}

export function fetchChatsForUser(user) {
  const chats = {
    "info": {
      "name": "matan",
      "image": "male.png"
    },
    "chats": {
      "tuta": {
        "messages": {
          "1": {
            "content": "Hi",
            "date": "03/12/2018",
            "hour": "15:15",
            "sendOrRecieve": 1
          },
          "2": {
            "content": "HiHi",
            "date": "03/12/2018",
            "hour": "15:16",
            "sendOrRecieve": 2
          },
          "3": {
            "content": "HiHi",
            "date": "03/12/2018",
            "hour": "15:17",
            "sendOrRecieve": 1
          }
        },
        "info": {
          "name": "tuta",
          "image": "male2.png"
        }
      },
      "ron": {
        "messages": {
          "1": {
            "content": "Hi",
            "date": "03/12/2018",
            "hour": "15:15",
            "sendOrRecieve": 1
          },
          "2": {
            "content": "HiHi",
            "date": "03/12/2018",
            "hour": "15:16",
            "sendOrRecieve": 2
          },
          "3": {
            "content": "HiHi",
            "date": "03/12/2018",
            "hour": "15:17",
            "sendOrRecieve": 1
          }
        },
        "info": {
          "name": "ron",
          "image": "male2.png"
        }
      }
    }
  }
  return {
    type: FETCH_CHATS_FOR_USER,
    payload: chats
  }
  // return dispatch => {
  //   fire.database().ref(`${user}/`).once('value', snap => {
  //     const chats = snap.val();
  //     dispatch({
  //       type: FETCH_CHATS_FOR_USER,
  //       payload: chats
  //     });
  //   });
  // }
}

export function fetchMessagesForChat(user, contact) {

  return dispatch => {
    fire.database().ref(`${user}/chats/${contact}`).once('value', snap => {
      const messages = snap.val();
      dispatch({
        type: FETCH_MESSAGES_FOR_CHAT,
        payload: messages
      });
    });
  }
}

export function deleteContactChat(user, contact) {
  const { username } = user;
  return dispatch => {
    fire.database().ref(`${username}/chats/${contact}`).remove().then(() => {
      // callback();
    });
    dispatch({
      type: DELETE_CONTACT_CHAT,
      payload: null
    });
  }
}
