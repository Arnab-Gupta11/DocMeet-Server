import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  db_uri: process.env.MONGODB_URI,

  jwt: {
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  },
};
