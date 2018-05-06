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
  ADD_AS_FRIEND, // when adding a friend
  FETCH_AVATARS
} from '../actions/types';

export function actionFetchAvatars(callback) {
  const numberOfAvatars = 32;
  return dispatch => {
    const arrayOfAvatars = [];
    arrayOfAvatars.push('default.png');
    for (let i = 1; i <= numberOfAvatars; i++) {
      fire.storage().ref(`/avatars/contact${i}.png`).getDownloadURL().then(url => {
        arrayOfAvatars.push(url);
      }).catch(error => {
        return arrayOfAvatars;
        // console.log(error)
      });
    }
    dispatch({
      type: FETCH_AVATARS,
      payload: arrayOfAvatars
    });
    callback();
  }
}

// export function actionSignUpUser(email, name) {
//   const numOfAvatars = 8;
//   const randImg = Math.floor((Math.random() * numOfAvatars) + 1);
//   return dispatch => {
//     fire.database().ref(`${name}/info`).set({
//       email, name, avatar: `contact${randImg}.png`
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

export function actionSignUpUser(email, name, avatar, uid, callback) {
  // const numOfAvatars = 8;
  // const randImg = Math.floor((Math.random() * numOfAvatars) + 1);
  // const avatar = `contact${randImg}.png`;
  console.log(uid, email, name, avatar);
  return dispatch => {
    fire.database().ref(`users/${uid}`).set({
      uid, email, name, avatar
    }).then(() => {
      fire.database().ref(`users/${uid}`).once('value', snap => {
        console.log(snap, snap.val());
        const userFromDB = snap.val();
        dispatch({
          type: SIGNUP_USER,
          payload: userFromDB
        });
        callback();
      });
    });
  };
}

// export function actionLoginUser(username) {
//   return dispatch => {
//     fire.database().ref(`${username}/info`).once('value', snap => {
//       const userFromDB = snap.val();
//       dispatch({
//         type: LOGIN_USER,
//         payload: userFromDB
//       });
//     });
//   }
// }

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

export function actionInitialDataForUser(uid, callback) {
  const fullData = { user: {}, friends: [] };
  return dispatch => {
    fire.database().ref(`friendships/${uid}`).once('value', friendsSnap => {
      const friends = friendsSnap.val();
      Object.keys(friends).map((objectkey, index) => {
        const { key, lastMessage, pinned } = friends[objectkey];
        const friend = { key, lastMessage, pinned };
        fire.database().ref(`users/${key}`).once('value', friendSnap => {
          friend.info = friendSnap.val();
          fullData.friends.push(friend);
        });
        return friend;
      });
    }).then(() => {
      fire.database().ref(`users/${uid}`).once('value', userSnap => {
        fullData.user = userSnap.val();
        dispatch({
          type: FETCH_ALL_DATA_FOR_USER,
          payload: fullData
        });
        callback();
      });
    });
  }
}

export function actionUpdateUserData(newUser, callback) {
  // ************ also need to update in auth ************
  const { uid, name, email, avatar } = newUser;
  return dispatch => {
    fire.database().ref(`users/${uid}`).set({
      uid, name, email, avatar
    })
    dispatch({
      type: UPDATE_USER_DATA,
      payload: newUser
    });
    callback();
  }
}

export function actionSendMessage(senderuid, recieveruid, message, callback) {
  const { id, content, date, hour } = message;
  const sender = senderuid;
  return dispatch => {
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
    fire.database().ref(`messages/${senderuid}/${recieveruid}/${message.id}`).remove()
      .then(() => {
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
  const { contactuid } = contact;
  return dispatch => {
    fire.database().ref(`messages/${useruid}/${contactuid}`).remove().then(() => {
      fire.database().ref(`friendships/${useruid}/${contactuid}`).remove().then(() => {
        fire.database().ref(`friendships/${contactuid}/${useruid}`).remove();
      });
    });
    dispatch({
      type: DELETE_CONTACT_CHAT,
      payload: contact
    });
    callback();
  }
}

export function actionPinUnpinChat(useruid, contact, isPinned, callback) {
  // const { email, avatar, name } = contact;
  contact.pinned = isPinned;
  return dispatch => {
    const updates = {};
    updates[`friendships/${useruid}/${contact.info.uid}/pinned`] = isPinned;
    fire.database().ref().update(updates);
    // fire.database().ref(`friendships/${useruid}/${contact.info.uid}/pinned`).set({
    //   pinned: isPinned
    // });
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
    // .then(() => {
    //   fire.database().ref(`messages/${useruid}/${contactuid}/lastMessage`).set({
    //     id: "aaaaaa",
    //     content: " ",
    //     date: " ",
    //     hour: "0:0:0",
    //     sender: useruid
    //   });
    // }).then(() => {
    //   fire.database().ref(`messages/${contactuid}/${useruid}/lastMessage`).set({
    //     id: "aaaaaa",
    //     content: " ",
    //     date: " ",
    //     hour: "0:0:0",
    //     sender: contactuid
    //   });
    // });
    dispatch({
      type: ADD_AS_FRIEND,
      payload: contact
    });
    callback();
  }
}