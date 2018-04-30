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
  FETCH_IMAGES
} from '../actions/types';

export function actionFetchImages(callback) {
  const numberOfImages = 8;
  return dispatch => {
    const arrayOfImages = [];
      for (let i = 1; i <= numberOfImages; i++) {
        fire.storage().ref(`/images/contact${i}.png`).getDownloadURL().then(url => {
          arrayOfImages.push(url);
        }).catch(error => {
          return arrayOfImages;
          // console.log(error)
        });
      }
    dispatch({
      type: FETCH_IMAGES,
      payload: arrayOfImages
    });
    callback();
  }
}

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

export function actionSignUpUser(email, name, image, uid, callback) {
  // const numOfImages = 8;
  // const randImg = Math.floor((Math.random() * numOfImages) + 1);
  // const image = `contact${randImg}.png`;
  console.log(uid, email, name, image);
  return dispatch => {
    fire.database().ref(`users/${uid}`).set({
      uid, email, name, image
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

// export function actionFetchAllDataForUser(email, callback) {
//   return dispatch => {
//     fire.database().ref(`${email}`).once('value', snap => {
//       const allDataForUser = snap.val();
//       dispatch({
//         type: FETCH_ALL_DATA_FOR_USER,
//         payload: allDataForUser
//       });
//       callback();
//     });
//   }
// }

export function actionFetchAllDataForUser(uid, callback) {
  const fullData = { user: {}, friends: [] };
  return dispatch => {
    fire.database().ref(`friendships/${uid}`).once('value', friendsSnap => {
      console.log(friendsSnap);
      const friendsKeys = Object.keys(friendsSnap.val());
      friendsKeys.map(friendKey => {
        fire.database().ref(`users/${friendKey}`).once('value', friendSnap => {
          fullData.friends.push(friendSnap.val());
        });
        return friendKey;
      });
    }).then(() => {
      fire.database().ref(`users/${uid}`).once('value', userSnap => {
        fullData.user = userSnap;
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
  const { uid, name, email, image } = newUser;
  return dispatch => {
    fire.database().ref(`users/${uid}`).set({
      uid, name, email, image
    })
    dispatch({
      type: UPDATE_USER_DATA,
      payload: newUser
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

export function actionSendMessage(senderuid, recieveruid, message, callback) {
  const { id, content, date, hour } = message;
  return dispatch => {
    fire.database().ref(`messages/${senderuid}/${recieveruid}/${message.id}`).set({
      id, content, date, hour, sender: senderuid
    }).then(() => {
      fire.database().ref(`messages/${recieveruid}/${senderuid}/${message.id}`).set({
        id, content, date, hour, sender: senderuid
      })
    }).then(() => {
      fire.database().ref(`messages/${senderuid}/${recieveruid}/lastMessage`).set({
        id, content, date, hour, sender: senderuid
      })
    }).then(() => {
      fire.database().ref(`messages/${recieveruid}/${senderuid}/lastMessage`).set({
        id, content, date, hour, sender: senderuid
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
    fire.database().ref(`messages/${senderuid}:${recieveruid}/${message.id}`).remove()
    dispatch({
      type: DELETE_MESSAGE,
      payload: message
    });
    callback();
  }
}

// export function actionFetchChatData(email, contactName, callback) {
//   return dispatch => {
//     fire.database().ref(`${email}/chats/${contactName}`).once('value', snap => {
//       const messages = snap.val();
//       dispatch({
//         type: FETCH_CHAT_DATA,
//         payload: messages
//       });
//       callback();
//     });
//   }
// }

export function actionFetchChatData(useruid, contactuid, callback) {
  const chatData = { contact: {}, messages: [] };

  return dispatch => {
    fire.database().ref(`messages/${useruid}:${contactuid}`).once('value', messagesSnap => {
      const messages = messagesSnap.val();
      chatData.messages.push(messages);
    }).then(() => {
      fire.database().ref(`users/${contactuid}`).once('value', contactSnap => {
        chatData.contact(contactSnap.val());
        dispatch({
          type: FETCH_CHAT_DATA,
          payload: chatData
        });
        callback();
      });
    });
  }
}

export function actionDeleteContactChat(useruid, contactuid, callback) {
  return dispatch => {
    fire.database().ref(`messages/${useruid}/${contactuid}`).remove().then(() => {
      fire.database().ref(`friendships/${useruid}/${contactuid}`).remove().then(() => {
        fire.database().ref(`friendships/${contactuid}/${useruid}`).remove();
      });
    });
    dispatch({
      type: DELETE_CONTACT_CHAT,
      payload: contactuid
    });
    callback();
  }
}

// export function actionPinUnpinChat(userEmail, contact, isPinned, callback) {
//   const { email, image, name } = contact;
//   contact.pinned = isPinned;
//   return dispatch => {
//     fire.database().ref(`${userEmail}/chats/${name}/info/`).set({
//       email, image, name, pinned: isPinned
//     });//******************************************************************** */
//     dispatch({
//       type: PINUNPIN_CHAT,
//       payload: contact
//     });
//     callback();
//   }
// }

export function actionPinUnpinChat(useruid, contact, isPinned, callback) {
  const { email, image, name } = contact;
  contact.pinned = isPinned;
  return dispatch => {
    fire.database().ref(`${useruid}/chats/${contact.uid}/info/`).set({
      email, image, name, pinned: isPinned
    });//******************************************************************** */
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
  console.log(useruid, contactuid);
  return dispatch => {
    fire.database().ref(`friendships/${useruid}/${contactuid}`).set({
      somethingggggg: contactuid
      // ********************************************** lo meduiak
    }).then(() => {
      fire.database().ref(`friendships/${contactuid}/${useruid}`).set({
        somethingggggg: useruid
      })
    })
    // .then(() => {
    //   fire.database().ref(`messages/${senderuid}/${recieveruid}/lastMessage`).set({
    //     id: "aaaaaa",
    //     content: " ",
    //     date: " ",
    //     hour: "0:0:0",
    //     sender: senderuid
    //   });
    // }).then(() => {
    //   fire.database().ref(`messages/${recieveruid}/${senderuid}/lastMessage`).set({
    //     id: "aaaaaa",
    //     content: " ",
    //     date: " ",
    //     hour: "0:0:0",
    //     sender: recieveruid
    //   });
    // });
    dispatch({
      type: ADD_AS_FRIEND,
      payload: contact
    });
    callback();
  }
}