// import React from 'react';

export function makeID() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export function sortMessagesByDate(array) {
  return array.sort((a, b) => {
    array.map((message) => {
      const splitDays = message.date.split('.');
      let numOfDays = 86400*splitDays[0]+2592000*splitDays[1]+31536000*(splitDays[2]-2015);
      numOfDays = isNaN(numOfDays) ? "0" : numOfDays;
      const splitHours = message.hour.split(':');
      let numOfHours = 60*splitHours[0]+splitHours[1];
      numOfHours = isNaN(numOfHours) ? "0" : numOfHours;
      message.time = numOfDays + numOfHours;
      // console.log(numOfDays + numOfHours);
      return message;
    });
    return (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0);

  });
}
