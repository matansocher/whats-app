import _ from 'lodash';
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
  PINUNPIN_CHAT,
  SEARCH_FRIENDS, // when trying to fetch new friends
  ADD_AS_FRIEND // when adding a friend
} from '../actions/types';

import { makeUserID } from './CommonFunctions';

// export function actionSignUpUser(email, name) {
//   const numOfImages = 8;
//   const randImg = Math.floor((Math.random() * numOfImages) + 1);
//   return dispatch => {
//     fire.database().ref(`${name}/info`).set({
//       email, name, image: `contact${randImg}.png`
//     }).then(() => {
//       fire.database().ref(`${name}/info`).once('value', snap => {
//         const userFromDB = snap.val();
//         dispatch({
//           type: SIGNUP_USER,
//           payload: userFromDB
//         });
//       });
//     });
//   };
// }

export function actionSignUpUser(email, name, userId) {
  const numOfImages = 8;
  const randImg = Math.floor((Math.random() * numOfImages) + 1);
  const image = `contact${randImg}.png`;
  console.log(userId, email, name,image);
  return dispatch => {
    fire.database().ref(`users/${userId}`).set({
      userId, email, name, image
    }).then(() => {
      fire.database().ref(`users/${userId}`).once('value', snap => {
        console.log(snap, snap.val());
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

export function actinoFetchAllDataForUser(email, callback) {
  return dispatch => {
    fire.database().ref(`${email}`).once('value', snap => {
      const allDataForUser = snap.val();
      dispatch({
        type: FETCH_ALL_DATA_FOR_USER,
        payload: allDataForUser
      });
      callback();
    });
  }
}

export function actionUpdateUserData(currentUser, newUsername, callback) {
  const { username } = currentUser;
  return dispatch => {
    fire.database().ref(`${username}/info`).set({
      name: newUsername
    }).then(() => {
      fire.database().ref(`${username}`).set({
        name: newUsername
      });
    });
    dispatch({
      type: UPDATE_USER_DATA,
      payload: currentUser
    });
    callback();
  }
}

// export function actionSendMessage(sender, reciever, message, callback) {
//   const { id, content, date, hour } = message;
//   return dispatch => {
//     fire.database().ref(`${sender}/chats/${reciever}/messages/${message.id}`).set({
//       id, content, date, hour, senderOrReciever: 1
//     }).then(() => {
//       fire.database().ref(`${reciever}/chats/${sender}/messages/${message.id}`).set({
//         id, content, date, hour, senderOrReciever: 2
//       })
//     }).then(() => {
//       fire.database().ref(`${sender}/chats/${reciever}/lastMessage/`).set({
//         id, content, date, hour, senderOrReciever: 1
//       })
//     }).then(() => {
//       fire.database().ref(`${reciever}/chats/${sender}/lastMessage/`).set({
//         id, content, date, hour, senderOrReciever: 2
//       })
//     }).then(() => {
//       dispatch({
//         type: SEND_MESSAGE,
//         payload: message
//       });
//       callback();
//     });
//   }
// }

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
      dispatch({
        type: SEND_MESSAGE,
        payload: message
      });
      callback();
    });
  }
}

export function actionDeleteMessage(email, contact, message, callback) {
  return dispatch => {
    fire.database().ref(`${email}/chats/${contact}/messages/${message.id}`).remove().then(() => {
      fire.database().ref(`${contact}/chats/${email}/messages/${message.id}`).remove();
    });
    dispatch({
      type: DELETE_MESSAGE,
      payload: message
    });
    callback();
  }
}

export function actionFetchChatData(email, contactName, callback) {
  return dispatch => {
    fire.database().ref(`${email}/chats/${contactName}`).once('value', snap => {
      const messages = snap.val();
      dispatch({
        type: FETCH_CHAT_DATA,
        payload: messages
      });
      callback();
    });
  }
}

export function actionDeleteContactChat(email, contact, callback) {
  return dispatch => {
    fire.database().ref(`${email}/chats/${contact.info.name}`).remove();
    dispatch({
      type: DELETE_CONTACT_CHAT,
      payload: contact
    });
    callback();
  }
}

export function actionPinUnpinChat(userEmail, contact, isPinned, callback) {
  const { email, image, name } = contact;
  contact.pinned = isPinned;
  return dispatch => {
    fire.database().ref(`${userEmail}/chats/${name}/info/`).set({
      email, image, name, pinned: isPinned
    });
    dispatch({
      type: PINUNPIN_CHAT,
      payload: contact
    });
    callback();
  }
}

export function actionSearchFriends(username, friendsNames, callback) {
  return dispatch => {
    fire.database().ref(`users`).once('value', snap => {
      const users = snap.val();
      const notFriends = [];
      _.map(users, u => {
        if(!_.includes(friendsNames, u.name)) {
          notFriends.push(u);
        }
      })
      dispatch({
        type: SEARCH_FRIENDS,
        payload: notFriends
      });
      callback();
    });
  }
}

export function actionAddAsFriend(username, friend, callback) {
  const { name, email, image } = friend;
  console.log(username, friend);
  return dispatch => {
    fire.database().ref(`${username}/chats/${name}`).set({
      name
    }).then(() => {
      fire.database().ref(`${username}/chats/${name}/lastMessage`).set({
        id: "aaaaaa",
        content: " ",
        date: " ",
        hour: "0:0:0",
        senderOrReciever: 1
      });
    }).then(() => {
      fire.database().ref(`${username}/chats/${name}/info`).set({
        email, image, name, pinned: false
      });
      dispatch({
        type: ADD_AS_FRIEND,
        payload: friend
      });
      callback();
    });
  }
}

// const first = "ron";
// const second = "matan";
// const array = [first, second];
// array.sort();
// fire.database().ref(`messages/${array[0]}:${array[1]}`).once('value', snap => {
//   const result = snap.val();
//   console.log(result);
// });
