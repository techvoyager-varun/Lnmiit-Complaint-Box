import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/db.js';
import { errorHandler } from './middleware/error.js';
import authRouter from './routes/auth.js';
import complaintRouter from './routes/complaints.js';

const app = express();

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRouter);
app.use('/api/complaints', complaintRouter);

app.use(errorHandler);

async function bootstrap(): Promise<void> {
  await connectToDatabase();
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend listening on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server', err);
  process.exit(1);
});


