import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as loki from 'lokijs';
import * as errorHandler from 'errorhandler';

import { configureData } from '../backend/data';
import { configureRoutes } from '../backend/routes';
import { ErrorMessage, ErrorTypes } from '../backend/core';


const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL || 'http://localhost:3000/api/';

const app = express();

app.set('port', port);
app.set('json spaces', 2);
app.set('etag', 'strong');
app.set('baseUrl', baseUrl);

app.use(logger('common'));
app.use(bodyParser.json());


configureData(app);
configureRoutes(app);


if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    console.log(err);
    if (typeof err['type'] !== 'undefined'
      && err['type'] === ErrorTypes.CLIENT_DATA_ERROR) {

      res.status(400).json(new ErrorMessage(400, err.message));
      return next();
    }
    res.status(500).json(new ErrorMessage(500, err.message));
    return next();
  });
} else {
  app.use(function (err, req, res, next) {
    if (typeof err['type'] !== 'undefined'
      && err['type'] === ErrorTypes.CLIENT_DATA_ERROR) {

      res.status(400).json(new ErrorMessage(400, err.message));
      return next();
    }
    res.status(500).json(new ErrorMessage(500, err.message));
    return next();
  });
}

export { app };
