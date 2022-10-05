const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();
const FREFIX = '/api'; //todo - better use a router

const secret = crypto.randomBytes(256).toString('base64'); //2^8
const cookieSecret = crypto.randomBytes(128).toString('base64'); //2^7

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(cookieSecret));
app.use(express.static(path.join(__dirname, 'public')));

const authMiddleware = (req, res, next) => {
  const token = req.signedCookies.token;
  // Checks the JWT token in the cookie to see if it's valid otherwise throws an exception
  try {
    jwt.verify(token, secret)
  }
  catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "Unauthorized"
    });
    return;
  }
  next();
}

//todo - can wire a small users db
const users = {
  tester: 'FooFooBar123!'
}

app.post(FREFIX+'/login', (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (users[username] && users[username] === password) {
    // We sign a JWT and store it in a cookie on the response.
    // The browser will store it and send it back down

    const refreshToken = jwt.sign({
      username,
    }, secret, { expiresIn: '1d' }); // refresh token

    const accessToken = jwt.sign({
      username,
      role: "singer",
      desc: "pull something from db"
    }, secret, { expiresIn: '10m' }); // todo: need to add a refresh endpoint and client support

    res.cookie('token', refreshToken, {
      sameSite: 'strict',
      httpOnly: true,
      signed: true,
      maxAge: 24 * 60 * 60 * 1000
    })
    res.send({
      loggedIn: true,
      message: "Successfully Logged In",
      accessToken
    });
  } else {
    res.status(401).send({
      loggedIn: false,
      message: "Unauthorized"
    });
  }
});


app.get(FREFIX+'/authenticated', authMiddleware, (req, res, next) => {
  res.send({
    loggedIn: true,
    message: "Indeed authenticated"
  });
});

app.get(FREFIX+'/logout', (req, res, next) => {
  // Cleanups
  res.clearCookie('token', {
    sameSite: 'strict',
    httpOnly: true,
    signed: true
  });
  res.send({
    loggedIn: false,
    message: 'Logged Out'
  });
});


module.exports = app;
