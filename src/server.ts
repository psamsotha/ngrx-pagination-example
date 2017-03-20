import { app } from './backend/app';


app.listen(app.get('port'), () => {
  console.log(`server app listening on ${app.get('port')}...`);
});
