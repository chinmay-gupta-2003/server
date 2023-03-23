const userRouter = require('./routes/userRoute');

const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));

app.use('/api/users', userRouter);

module.exports = app;
