import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import { AppDataSource } from './data-source';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_, res) => res.send('running'));

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);

  AppDataSource.initialize()
    .then(() => {
      console.log('database initialized');
    })
    .catch((error) => {
      console.log(error);
    });
});
