import express, { Application } from 'express';
import cors from 'cors';

import wineRoutes from './routes/wineRoutes';
import favouriteRoutes from './routes/favouriteRoutes';
import searchRoutes from './routes/searchRoutes';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/wines', wineRoutes);
// app.use('/favourites', favouriteRoutes);
app.use('/', searchRoutes);

export default app;
