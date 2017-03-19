import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as loki from 'lokijs';
import * as errorHandler from 'errorhandler';

import { configureData } from './backend/data';
import { configureRoutes } from './backend/routes';
import { ErrorMessage } from './backend/core';


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
  app.use(errorHandler());
} else {
  app.use(function (err, req, res, next) {
    res.json(new ErrorMessage(500, err.message));
    return next();
  });
}


app.listen(app.get('port'), () => {
  console.log(`server app listening on ${app.get('port')}...`);
});

