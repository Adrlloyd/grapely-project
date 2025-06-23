import express, { Application } from 'express';
import cors from 'cors';

import wineRoutes from './routes/wineRoutes';
import favouriteRoutes from './routes/favouriteRoutes';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/wines', wineRoutes);
// app.use('/api/favourites', favouriteRoutes);

export default app;
