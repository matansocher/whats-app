import _ from 'lodash';
import { FETCH_CHATS_FOR_USER } from '../actions/types';

const data = {
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

export default function(state = data, action) {
  switch (action.type) {
    case FETCH_CHATS_FOR_USER:
      return action.payload;
    default:
      return state;
  }
}
