require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./config/db');
const { errorHandler } = require('./middleware/error');
const authRouter = require('./routes/auth');
const complaintRouter = require('./routes/complaints');

const app = express();

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

// Allow CORS from configured frontend and localhost for local dev
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:8080',
  'https://localhost:8080',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser requests (no origin) and allowed origins
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
  })
);
app.use(express.json());


app.get('/', (_req, res) => {
  res.send('LNMIIT Complaint Box API is running!');
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRouter);
app.use('/api/complaints', complaintRouter);

app.use(errorHandler);

async function bootstrap() {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});


