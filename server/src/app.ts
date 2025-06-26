import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
import wineRoutes from './routes/wineRoutes';
import favouriteRoutes from './routes/favouriteRoutes';
import searchRoutes from './routes/searchRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import ratingRoutes from './routes/ratingRoutes'
import randomRoutes from './routes/randomRoutes';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/wines', wineRoutes);
app.use('/api/favourites', favouriteRoutes);
app.use('/api/', searchRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/rating', ratingRoutes);
app.use('/api/random', randomRoutes);

export default app;
