import { Server } from 'http';
import app from './app';
import config from './app/config';
import { connectToDatabase, disconnectDatabase } from './app/db';

let server: Server | null = null;

async function bootstrap() {
  try {
    //connect to db.
    await connectToDatabase(config.db_uri as string);
    //listenning app.
    server = app.listen(config.port, () => {
      console.log(`🚀 Server running on port: ${config.port}`);
    });

    //process.on('SIGTERM', () => shutdown('SIGTERM')); //Optionally write this if shutdown is not higher order function.
    // Listen for SIGTERM signal (e.g., from Docker or cloud provider) and initiate graceful shutdown
    process.on('SIGTERM', shutdown('SIGTERM'));

    // Listen for SIGINT signal (e.g., when user presses Ctrl+C in terminal) and initiate graceful shutdown
    process.on('SIGINT', shutdown('SIGINT'));

    // Handle uncaught exceptions (errors that weren't caught anywhere in the code)
    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      // Initiate shutdown with context of the error
      shutdown('uncaughtException')();
    });

    // Handle unhandled promise rejections (promises without .catch() handler)
    process.on('unhandledRejection', (err) => {
      console.error('Unhandled Rejection:', err);
      // Initiate shutdown with context of the error
      shutdown('unhandledRejection')();
    });
  } catch (err) {
    console.error('❌ App bootstrap failed:', err);
    // Exit the process with a failure code (1 = error).
    // Used when something went wrong and we want to signal failure to the OS or process manager.
    process.exit(1);
  }
}

/*
Because shutdown is a higher-order function (returns another function), calling shutdown('SIGTERM') returns a function like this:

() => {
  console.log("📦 Received SIGTERM. Shutting down...");
  // then closes the server and exits
}

*/
//Gracefull shutdown
const shutdown = (signal: string) => () => {
  console.log(`\n📦 Received ${signal}. Shutting down...`);
  if (server) {
    server.close(async () => {
      console.log('🔒 HTTP server closed');
      await disconnectDatabase();
      process.exit(0);
    });
  } else {
    // Exit the process with a success code (0 = no error).
    // Used when the shutdown or exit is intentional and successful.
    process.exit(0);
  }
};

bootstrap();
