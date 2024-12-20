import http from 'http';
import app from './app';
import config from './config';
import connectDatabase from './db';

// Connect to database with connectDatabase() funtion and start server
connectDatabase()
  .then(() => {
    app.listen(config.port || 5000, () => {
      console.log(`⚙️ Server is running at http://localhost:${config.port}`);
    });
  })
  .catch(error => {
    console.log('MONGO db connection failed !!! ', error);
  });

// The Server variable is initialized with http.createServer.
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

// Handle Unhandle rejections error from the server side
process.on('unhandledRejection', () => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Handle the uncaught exception that occurred while trying to reconnect to the server
process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
