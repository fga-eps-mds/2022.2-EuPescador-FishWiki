import { Pool } from 'pg'
import fishLogSeed from '../utils/seed/fishLogSeed';

const databaseConnect = async () => {
  try {
    const pool = new Pool({
      user: '',
      host: '',
      database: '',
      password: '',
      port: 2
  });
  return pool;
    await fishLogSeed();
  } catch (error) {
    console.log('Não foi possível inicicializar corretamente a base de dados!');
    console.log(error);
  }
};
export default databaseConnect;
