import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  db_uri: process.env.MONGODB_URI,
  frontend_host: process.env.FRONTEND_HOST,

  jwt: {
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  },

  email: {
    email_host: process.env.EMAIL_HOST,
    email_port: process.env.EMAIL_PORT,
    email_user: process.env.EMAIL_USER,
    email_pass: process.env.EMAIL_PASS,
    email_from: process.env.EMAIL_FROM,
  },
};
