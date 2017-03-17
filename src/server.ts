import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as loki from 'lokijs';

import { configureDatabase } from './backend/data';
import { configureRoutes } from './backend/routes';

const app = express();

app.set('json spaces', 2);
app.set('etag', 'strong');
app.set('baseUrl', 'http://localhost:3000');

app.use(logger('common'));
app.use(bodyParser.json());

configureDatabase(app);
configureRoutes(app);


app.listen(3000, () => {
  console.log('server app listening on 3000...');
});

