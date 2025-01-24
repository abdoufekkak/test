
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const productRoutes = require('./routes/products');
const storeRoutes = require('./routes/stores');
const globalErrorHandlerMiddleware = require('./middlewares/global-error-handler-middleware');
const reservationRoutes = require('./routes/reservation'); // Importer la route de réservation
const notFoundErrorMiddleware = require('./middlewares/not-found-error-middleware');
const port = 3000; // Backend server port



async function init() {
  try {

    // Middleware pour gérer CORS et analyser le corps de la requête
app.use(cors());
app.use(bodyParser.json());
app.use('/api/products', productRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/reservation', reservationRoutes);

app.use(globalErrorHandlerMiddleware);


      /* Not found error handling middleware */
      app.use("*", notFoundErrorMiddleware);

      /* Global Error handling middleware */
       app.use(globalErrorHandlerMiddleware);
  
      /* Start server */
      const serverListen = app.listen(port, () => {
        console.log(`🚀 Server listening on port ${port}`);
      });
  
      /* Handling rejection outside express */
      process.on("unhandledRejection", (error) => {
        throw error;
      });
  
      /* Handling exception */
      const uncaughtException = (error) => {
        serverListen.close(() => {
          console.error(
            `The server was shut down due to uncaught exception: ${error.message}`
          );
          process.exit(1);
        });
      };
  
      process.on("uncaughtException", uncaughtException);
  
      /* Handle process termination signals */
      const shutdown = () => {
        serverListen.close(() => {
          console.log("The server is shutting down...");
          process.exit(0);
        });
      };
  
      process.on("SIGTERM", shutdown);
      process.on("SIGINT", shutdown);
  }
  catch (error) {
    console.error(`An error occurred during startup: ${error.message}`);
    process.exit(1);
  }
}


init();
