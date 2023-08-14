import express from 'express';
import connectDB from './config/db';

const app = express();

const port = process.env.PORT || 3333;

connectDB();

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});