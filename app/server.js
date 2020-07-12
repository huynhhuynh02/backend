import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import {appLog, httpStream} from './config/winston';
import appConf from './config/application';

import {FormError, isSystemError} from './config/error';
import {loadConfigure} from "./config/system";
import {initWebAuthController} from "./controller/web/auth.controller";
import {initMobileController} from "./controller/mobile";

const passport = require('passport');

require('./service/passport')(passport);

const morgan = require('morgan');

export const app = express();

app.use(morgan('combined', {stream: httpStream}));
app.use(passport.initialize());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false}));

/* eslint-enable no-unused-vars */
app.get('/', (req, res) => res.send({message: 'Welcome to the default API route'}));

/* MOBILE */
initMobileController(app);

/* WEB */
initWebAuthController(app);

app.use((err, req, res, next) => {
  appLog.error('error', 'Exception: ', err);
  next(err);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err instanceof FormError) {
    res.status(err.code)
      .json(err.errors);
  } else if (!isSystemError(err)) {
    res.statusMessage = err.message;
    res.status(err.code || 500)
      .json({error: err.message});
  }
});

// setup express application
const server = http.createServer(app);

server.listen(appConf.port, appConf.hostname, async () => {
  await loadConfigure().then(systemConfigure => {
    appLog.info(`System Configure Load: ${JSON.stringify(systemConfigure)}`)
  });
  appLog.info(`Server running at http://${appConf.hostname}:${appConf.port}/`);
});
