import 'reflect-metadata';
import app from './app';
import { connection } from './database';
import fishLogSeed from './utils/seed/fishLogSeed';

connection
  .initialize()
  .then(() => {
    console.log('Banco conectado!');
    fishLogSeed();
  })
  .catch((err: any) => {
    console.log(err);
  });

const serverPort = process.env.PORT || 4002;

app.listen(serverPort, () => {
  console.log('server running on port %d', serverPort);
});
