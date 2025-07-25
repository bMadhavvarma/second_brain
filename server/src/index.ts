import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';

config(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.use('/api/v1', authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
