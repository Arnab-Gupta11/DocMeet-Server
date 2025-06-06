import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import os from 'os';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();
const corsOptions: cors.CorsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
};

//Middleware Setup
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route Middleware

// Test route
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  const currentDateTime = new Date().toISOString();
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const serverHostname = os.hostname();
  const serverPlatform = os.platform();
  const serverUptime = os.uptime();

  res.status(200).json({
    success: true,
    message: 'Welcome to the DocMeet Server',
    version: '1.0.0',
    clientDetails: {
      ipAddress: clientIp,
      accessedAt: currentDateTime,
    },
    serverDetails: {
      hostname: serverHostname,
      platform: serverPlatform,
      uptime: `${Math.floor(serverUptime / 60 / 60)} hours ${Math.floor(
        (serverUptime / 60) % 60,
      )} minutes`,
    },
    developerContact: {
      email: 'arnab.gupta.011@gmail.com',
      website: 'https://arnab-gupta.netlify.app',
    },
  });
});

//Global Error handler.
app.use(globalErrorHandler);
//Not Found Route.
app.use(notFound);

export default app;
