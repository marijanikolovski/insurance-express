import express from 'express';
import connectDB from './config/db';
import cityRoute from './routes/cityRoutes';
import ageRoute from './routes/ageRoutes';

const app = express();

const port = process.env.PORT || 3333;

connectDB();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use('/api', cityRoute);
app.use('/api', ageRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});