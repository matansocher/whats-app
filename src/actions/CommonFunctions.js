// import React from 'react';

export function makeID() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export function getCharFromNumber(number) {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return possible.charAt(number);
}

export function makeMessageID() {
  const date = new Date();
  const dateString = `${getCharFromNumber(date.getFullYear()-2000)}${getCharFromNumber(date.getMonth())}${getCharFromNumber(date.getDate())}`;
  const hourString = `${getCharFromNumber(date.getHours())}${getCharFromNumber(date.getMinutes())}${getCharFromNumber(getSeconds())}`;
  return `${dateString}${hourString}`;
  // return date.getTime();
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

export function validateEmail(email) {
  // check in db if user already exists
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validatePassword(password) {
  if(password.length < 6) {
    return 'short';
  }
  return true;
}
