import _ from 'lodash';
import fire from '../firebase';
import {
  FETCH_AVATARS,
  SIGNUP_USER,
  LOGIN_USER,
  LOGOUT_USER,
  FETCH_USER_DATA, // fetches all user data
  FETCH_FRIENDS_LIST, // fetches the friends list of a user
  FETCH_CHAT_DATA, // when selecting contact
  UPDATE_USER_DATA, // update the user data
  SEND_MESSAGE, // send message to sender and reciever
  DELETE_MESSAGE, // delete individual message
  DELETE_CONTACT_CHAT,
  PINUNPIN_CHAT,
  SEARCH_FRIENDS, // when trying to fetch new friends
  ADD_AS_FRIEND // when adding a friend
} from '../actions/types';

import { getAvatarsNames } from './CommonFunctions';


export function actionFetchAvatars(callback) {
  return dispatch => {
    const arrayOfAvatarsURLs = [];
    getAvatarsNames().forEach(name => {
      fire.storage().ref(`/avatars/${name}`).getDownloadURL().then(url => {
        arrayOfAvatarsURLs.push(url);
      }).catch(error => {
        console.log(error)
        return arrayOfAvatarsURLs;
      });
    });
    dispatch({
      type: FETCH_AVATARS,
      payload: arrayOfAvatarsURLs
    });
    callback();
  }
}

export function actionSignUpUser(email, name, avatar, uid, callback) {
  return dispatch => {
    fire.storage().ref(`/avatars/${avatar}`).getDownloadURL().then(url => {
      fire.database().ref(`users/${uid}`).set({
        uid, email, name, avatar: url
      }).then(() => {
        // fire.database().ref(`users/${uid}`).once('value', snap => {
        // const userFromDB = snap.val();
        const user = { uid, email, name, avatar: url };
        dispatch({
          type: SIGNUP_USER,
          payload: user
        });
        callback();
        // });
      });
    });
  };
}

export function actionLoginUser(uid) {
  return dispatch => {
    fire.database().ref(`users/${uid}`).once('value', snap => {
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

export function actionFetchFriendsList(uid, callback) {
  let friends = [];
  return dispatch => {
    fire.database().ref(`friendships/${uid}`).once('value', friendsSnap => {
      friends = friendsSnap.val() || {};
      Object.keys(friends).map((objectkey) => {
        const { key, lastMessage, pinned } = friends[objectkey];
        const friend = { key, lastMessage, pinned };
        console.log(friend)
        fire.database().ref(`users/${key}`).once('value', friendSnap => {
          friend.info = friendSnap.val();
          console.log(friend)
        }).then(() => {
          fire.storage().ref(`/avatars/${friend.info.avatar}`).getDownloadURL().then(url => {
            friend.info.avatar = url;
            console.log("************************", friend)
            friends.push(friend);
          }).catch(error => { console.log(error); });
        });
        return friend;
      });
    })
    dispatch({
      type: FETCH_FRIENDS_LIST,
      payload: friends
    });
    callback();
  }
}

export function actionFetchUserData(uid, callback) {
  let user = {};
  return dispatch => {
    fire.database().ref(`users/${uid}`).once('value', userSnap => {
      user = userSnap.val();
    }).then(() => {
      fire.storage().ref(`/avatars/${user.avatar}`).getDownloadURL().then(url => {
        user.avatar = url;
        dispatch({
          type: FETCH_USER_DATA,
          payload: user
        });
        callback();
      });
    });
  }
}

export function actionUpdateUserData(newUser, callback) {
  // ************ also need to update email in auth ************
  const { uid, name, email, avatar } = newUser;
  return dispatch => {
    // email update
    // firebase.auth().currentUser.updateEmail("user@example.com").then(() => {

    fire.database().ref(`users/${uid}`).set({
      uid, name, email, avatar
    });
    dispatch({
      type: UPDATE_USER_DATA,
      payload: newUser
    });
    callback();

    // }).catch(error => {
    //   console.log(error);
    // });
  }
}

export function actionSendMessage(senderuid, recieveruid, message, callback) {
  const { id, content, date, hour, sender } = message;
  // const sender = senderuid;
  return dispatch => {


    // ********************************
    // const updates = {};
    // updates[`messages/${senderuid}/${recieveruid}/${message.id}`] =
    //   { id, content, date, hour, sender };
    // updates[`messages/${recieveruid}/${senderuid}/${message.id}`] =
    //   { id, content, date, hour, sender };
    // updates[`friendships/${senderuid}/${recieveruid}/lastMessage`] =
    //   { id, content, date, hour, sender };
    // updates[`friendships/${recieveruid}/${senderuid}/lastMessage`] =
    //   { id, content, date, hour, sender };
    // fire.database().ref().update(updates).then(() => {
    //   dispatch({
    //     type: SEND_MESSAGE,
    //     payload: message
    //   });
    //   callback();
    // });
    // ********************************


    fire.database().ref(`messages/${senderuid}/${recieveruid}/${message.id}`).set({
      id, content, date, hour, sender
    }).then(() => {
      fire.database().ref(`messages/${recieveruid}/${senderuid}/${message.id}`).set({
        id, content, date, hour, sender
      })
    }).then(() => {
      fire.database().ref(`friendships/${senderuid}/${recieveruid}/lastMessage`).set({
        id, content, date, hour, sender
      })
    }).then(() => {
      fire.database().ref(`friendships/${recieveruid}/${senderuid}/lastMessage`).set({
        id, content, date, hour, sender
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

export function actionDeleteMessage(senderuid, recieveruid, message, callback) {
  return dispatch => {
    fire.database().ref(`messages/${senderuid}/${recieveruid}/${message.id}`).remove().then(() => {
      fire.database().ref(`friendships/${senderuid}/${recieveruid}/lastMessage`).remove()
    })
    dispatch({
      type: DELETE_MESSAGE,
      payload: message
    });
    callback();
  }
}

export function actionFetchChatData(useruid, contactuid, callback) {
  const chatData = { contact: {}, messages: [] };

  return dispatch => {
    fire.database().ref(`messages/${useruid}/${contactuid}`).once('value', messagesSnap => {
      const messages = messagesSnap.val();
      chatData.messages = messages;
    }).then(() => {
      fire.database().ref(`users/${contactuid}`).once('value', contactSnap => {
        const contact = contactSnap.val();
        chatData.contact = contact;
        dispatch({
          type: FETCH_CHAT_DATA,
          payload: chatData
        });
        callback();
      });
    });
  }
}

export function actionDeleteContactChat(useruid, contact, callback) {
  const contactuid = contact.key;
  console.log(useruid, contact, contactuid)
  return dispatch => {
    fire.database().ref(`messages/${useruid}/${contactuid}`).remove().then(() => {
      fire.database().ref(`friendships/${useruid}/${contactuid}`).remove().then(() => {
        dispatch({
          type: DELETE_CONTACT_CHAT,
          payload: contact
        });
        callback();
      });
    });
    // dispatch({
    //   type: DELETE_CONTACT_CHAT,
    //   payload: contact
    // });
    // callback();
  }
}

export function actionPinUnpinChat(useruid, contact, isPinned, callback) {
  contact.pinned = isPinned;
  return dispatch => {
    const updates = {};
    updates[`friendships/${useruid}/${contact.info.uid}/pinned`] = isPinned;
    fire.database().ref().update(updates);
    dispatch({
      type: PINUNPIN_CHAT,
      payload: contact
    });
    callback();
  }
}

export function actionSearchFriends(uid, friendsUids, callback) {
  return dispatch => {
    fire.database().ref(`users`).once('value', snap => {
      const users = snap.val();
      const notFriends = [];
      _.map(users, u => {
        if (!_.includes(friendsUids, u.uid)) {
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

export function actionAddAsFriend(useruid, contact, callback) {

  const contactuid = contact.uid;
  return dispatch => {
    fire.database().ref(`friendships/${useruid}/${contactuid}`).set({
      key: contactuid, pinned: false
    }).then(() => {
      fire.database().ref(`friendships/${contactuid}/${useruid}`).set({
        key: useruid, pinned: false
      })
    })
    dispatch({
      type: ADD_AS_FRIEND,
      payload: contact
    });
    callback();
  }
}