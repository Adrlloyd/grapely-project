import Express from 'express';
import Cors from 'cors';

const app = Express();

const PORT = 3000;

app.use(Cors());
app.use(Express.json());

app.listen(PORT, () => {
  console.log('Server running at PORT: ', PORT);
})