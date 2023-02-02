import 'reflect-metadata';
import app from './app';
import { connection } from './database';

connection
  .initialize()
  .then(() => {
    console.log('Banco conectado!');
  })
  .catch((err: any) => {
    console.log(err);
  });

const serverPort = process.env.PORT || 4002;

app.listen(serverPort, () => {
  console.log('server running on port %d', serverPort);
});
