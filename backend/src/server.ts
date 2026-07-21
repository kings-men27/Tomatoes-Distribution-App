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

app.use('/api', apiRouter);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'success', message: 'farm API is live.' });
});


//Server & Database Initialization
async function startServer() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('Database connection established.');
    }

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error during startup:', error);
  }
}

startServer();