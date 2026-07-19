import 'reflect-metadata'; 
import express, { Application, Request, Response } from 'express';
import { ensureDatabaseExists } from './db/DbExists';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import process from 'process';

// Importing Data Source, Jobs, and Routes
import { AppDataSource } from '././db/datasource';
//import { startBookingStatusScheduler } from '././jobs/bookingScheduler';
import apiRouter from '././routes/routes';

dotenv.config();

const app: Application = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;





async function startServer() {
  try {
    // 1. Ensure the DB is created first
    await ensureDatabaseExists();

    // 2. Now initialize your AppDataSource (which connects to 'tomatoes')
    await AppDataSource.initialize();
    console.log("AppDataSource initialized successfully.");
    
    // ... start your express server here
  } catch (error) {
    console.error("Error during startup:", error);
  }
}

startServer();



// --- Security & Utility Middlewares ---
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 'fail', message: 'Too many requests, please try again later.' }
}));

//Swagger
const swaggerPath = path.join(process.cwd(), 'swagger.json');

if (fs.existsSync(swaggerPath)) {
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use('/', apiRouter);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'success', message: 'farm API is live.' });
});


// --- Server & Database Initialization ---
AppDataSource.initialize()
  .then(() => {
    
    console.log(' Database connection established.');
   // startBookingStatusScheduler();
    
    app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
  })
  .catch((error) => {
    console.error(' Server startup failed:', error);
    process.exit(1);
  });