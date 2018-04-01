import React from 'react';
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
  // return date.getTime();
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
