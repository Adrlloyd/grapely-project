import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
import wineRoutes from './routes/wineRoutes';
import favouriteRoutes from './routes/favouriteRoutes';
import searchRoutes from './routes/searchRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/wines', wineRoutes);
// app.use('/favourites', favouriteRoutes);
app.use('/', searchRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

export default app;
