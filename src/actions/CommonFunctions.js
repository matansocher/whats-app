import React from 'react';
import _ from 'lodash';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

export function sortByUid(array) {
  return array.sort();
}

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

export function getDateHourString() { // for last seen
  const date = new Date();
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const hourString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return `${dateString} ${hourString}`
}

export function getLastSeenString(lastSeen) { // for last seen
  if(lastSeen === "Online"){
    return lastSeen;
  }
  const splitted = lastSeen.split(" ");
  let dateString = splitted[0];
  let splittedDate = dateString.split("-");
  let hourString = splitted[1];
  let splittedHour = hourString.split(":");
  
  const dateObject = new Date(splittedDate[0], splittedDate[1]-1, splittedDate[2]);
  if (checkIfToday(new Date(), dateObject)) {
    return `Last seen today at ${splittedHour[0]}:${splittedHour[1]}`;
  }

  return `Last seen at ${dateString} ${dateString}`;
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

export function getChatBubbleDate(nextMessage) {
  let lastTime = getLastMessageTime(nextMessage);
  lastTime = lastTime.includes(":") ? "Toady" : lastTime;
  return (
    <div key={nextMessage.date} className="day-indicator">
      {lastTime}
    </div>
  )
}

export function filterBySearch(array, subString) {
  return _.filter(array, (contact) => {
    return contact.name.toLowerCase()
      .startsWith(subString.toLowerCase());
  });
}

export function sortContactsByLastMessageTime(array) {
  return array.sort((a, b) => {
    array.map((contact) => {
      if(!contact.lastMessage) { // no last message- return high epoch
        contact.epoch = new Date(2020, 12, 12)
      } else {
        const splitDays = contact.lastMessage.date.split('-');
        const splitHours = contact.lastMessage.hour.split(':');
        const epoch = new Date(splitDays[0], splitDays[1], splitDays[2],
          splitHours[0], splitHours[1], splitHours[2]).getTime() / 1000;
        contact.epoch = epoch;
      }
      return contact;
    });
    return (a.epoch > b.epoch) ? -1 : ((b.epoch > a.epoch) ? 1 : 0);
  });
}

export function splitToPinned(array) {
  const pinned =  _.filter(array, (contact) => {
    return contact.pinned;
  });
  const notPinned =  _.filter(array, (contact) => {
    return !contact.pinned;
  });
  return [...pinned, ...notPinned];
}

export function getLastMessageTime(lastMessage) {
  if(!lastMessage || lastMessage.date === " " || lastMessage.hour === "0:0:0") {
    return "";
  }
  const splitDate = lastMessage.date.split('-');
  const today = new Date();
  const dateObject = new Date(splitDate[0], splitDate[1]-1, splitDate[2]);
  if (checkIfToday(today, dateObject))
    return getCorrectHour(lastMessage.hour);

  if(checkIfYesterday(today, dateObject))
    return "Yesterday";

  if(checkIfLastWeek(today, dateObject))
    return getDayFromDayNumber(dateObject.getDay());

  return `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`; // not today, and not in this week
}

function checkIfToday(today, dateObject) {
  if (today.getFullYear() === dateObject.getFullYear() &&
    today.getMonth() === dateObject.getMonth() &&
    today.getDate() === dateObject.getDate())
    return true;
  return false;
}

function checkIfYesterday(today, dateObject) {
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

export function compareDates(date1, date2) {
  const split1 = date1.split('-');
  const split2 = date2.split('-');
  if(split1[0] === split2[0] && split1[1] === split2[1] &&
    split1[2] === split2[2]) { // not on the same day
    return true;
  }
  return false;
}

function getDayFromDayNumber(dayNumber) {
  dayNumber = dayNumber > 6 || dayNumber < 0 ? 0 : dayNumber;
  const daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysArray[dayNumber];
}

function getLastDayOfPrevMonth(month) {
  if(month === 1) return 28;
  else if (month === 3 || month === 5 || month === 8 || month === 10) return 30;
  else return 31;
}

export function getLastMessageContent(content) {
  const textWidth = (window.innerWidth - 100)/9;
  return content.length > textWidth ? `${content.substr(0, textWidth)}...`: content;
}

export function getAvatarsNames() {
  const numberOfAvatars = 7;
  const arrayOfAvatarsNames = [];
  arrayOfAvatarsNames.push('default.png');
  for (let i = 1; i <= numberOfAvatars; i++) { // insert names into array
    arrayOfAvatarsNames.push(`contact${i}.png`);
  }
  return arrayOfAvatarsNames;
}