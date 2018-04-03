import React from 'react';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

export function getCharFromNumber(number) {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return possible.charAt(number);
}

export function makeMessageID() {
  const date = new Date();
  const dateString = `${getCharFromNumber(date.getFullYear()-2000)}${getCharFromNumber(date.getMonth())}${getCharFromNumber(date.getDate())}`;
  const hourString = `${getCharFromNumber(date.getHours())}${getCharFromNumber(date.getMinutes())}${getCharFromNumber(date.getSeconds())}`;
  return `${dateString}${hourString}`;
}

export function validateEmail(email) {
  // check in db if user already exists
  // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return re.test(String(email).toLowerCase());
  return true;
}

export function validatePassword(password) {
  if(password.length < 6) {
    return 'short';
  }
  return true;
}

export function getCorrectHour(time) {
  const hourArray = time.split(':');
  let hour = hourArray[0];
  let minute = hourArray[1];
  hour = hour < 10 ? `0${hour}` : hour;
  minute = minute < 10 ? `0${minute}` : minute;
  return `${hour}:${minute}`
}

export function getCircularProgress() {
  return(
    <MuiThemeProvider>
      <div className="center">
        <CircularProgress size={80} thickness={5} />
      </div>
    </MuiThemeProvider>
  );
}

export function filterBySearch(array, subString) {
  return _.filter(array, (contact) => {
    return contact.info.name.toLowerCase()
      .startsWith(subString.toLowerCase());
  });
}

export function sortContactByLastMessageTime(array) {
  return array.sort((a, b) => {
    array.map((contact) => {
      const splitDays = contact.lastMessage.date.split('-');
      const splitHours = contact.lastMessage.hour.split(':');
      const epoch = new Date(splitDays[0], splitDays[1], splitDays[2],
        splitHours[0], splitHours[1], splitHours[2]).getTime() / 1000;
      contact.epoch = epoch;
      return contact;
    });
    return (a.epoch > b.epoch) ? -1 : ((b.epoch > a.epoch) ? 1 : 0);
  });
}

export function getLastMessageTime(lastMessage) {
  const splitDate = lastMessage.date.split('-');
  const splitHour = lastMessage.hour.split(':');
  const today = new Date();
  const dateObject = new Date(splitDate[0], splitDate[1]-1, splitDate[2]);
  if (checkIfToday(today, dateObject))
    return `${splitHour[0]}:${splitHour[1]}`;

  if(checkIfYesterday(today, dateObject))
    return "Yesterday";

  if(checkIfLastWeek(today, dateObject))
    return getDayFromDayNumber(dateObject.getDay());

  return `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`; // not today, and not in this week

  // if (today.getFullYear() === dateObject.getFullYear()) &&
  //   (today.getMonth()) === dateObject.getMonth()) &&
  //   today.getDate() === dateObject.getDate()) { // today
  //   return `${splitHour[0]}:${splitHour[1]}`;
  // }
  // if (today.getFullYear() === dateObject.getFullYear() &&
  //   today.getMonth() === dateObject.getMonth() &&
  //   today.getDate() - 1 === dateObject.getDate()) { // yesterday
  //   return "Yesterday";
  // }

  // if (today.getFullYear() === Number(splitDate[0]) &&
  //   (today.getMonth() + 1) === Number(splitDate[1]) &&
  //   today.getDate() === Number(splitDate[2])) { // today
  //   return `${splitHour[0]}:${splitHour[1]}`;
  // }
  // if (today.getFullYear() === Number(splitDate[0]) &&
  //   (today.getMonth() + 1) === Number(splitDate[1]) &&
  //   today.getDate() - 1 === Number(splitDate[2])) { // yesterday
  //   return "Yesterday";
  // }
  // if(((today.getTime()/1000) - (dateObject.getTime()/1000)) < 7*dayInSeconds) { // not today or yesterday, but in this week
  //   return getDayFromDayNumber(dateObject.getDay());
  // }
  // return `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`; // not today, and not in this week
}

function checkIfToday(today, dateObject) {
  console.log(today);
  console.log(dateObject);
  if (today.getFullYear() === dateObject.getFullYear()) &&
    (today.getMonth()) === dateObject.getMonth()) &&
    (today.getDate() === dateObject.getDate()))
    return true;
  return false;
}

function checkIfYesterday(today, dateObject) {
  console.log(today);
  console.log(dateObject);
  if(today.getFullYear() === dateObject.getFullYear() &&
    today.getMonth() === dateObject.getMonth() &&
    today.getDate() !== 1 &&
    (today.getDate() - 1) === dateObject.getDate())  // not first day of month
    return true;

  if(today.getFullYear() === dateObject.getFullYear() &&
    today.getDate() === 1 &&
    today.getMonth() - 1 === dateObject.getMonth() &&
    getLastDayOfPrevMonth(today.getMonth()) === dateObject.getDate()) // first day of month
    return true;

  if(today.getDate() === 1 &&
    today.getMonth() === 0 &&
    dateObject.getDate() === 31 &&
    dateObject.getMonth() === 11 &&
    (today.getFullYear() - 1) === dateObject.getFullYear()) // first day of year
    return true;

  return false; // nothing from above
}

function checkIfLastWeek(today, dateObject) {
  const dayInSeconds = 60*60*24;
  if(((today.getTime()/1000) - (dateObject.getTime()/1000)) < 7*dayInSeconds) // not today or yesterday, but in this week
    return true;
  return false;
}

function getDayFromDayNumber(dayNumber) {
  dayNumber = dayNumber > 6 || dayNumber < 0 ? 0 : dayNumber;
  const daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysArray[dayNumber];
}

function getLastDayOfPrevMonth(month) {
  let numOfDaysInMonth = 0;
  if(month === 1) return 28;
  else if (month === 3 || month === 5 || month === 8 || month === 10) return 30;
  else return 31;
}
