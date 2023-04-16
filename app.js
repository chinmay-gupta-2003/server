const userRouter = require('./routes/userRoute');
const postRouter = require('./routes/postRoute');
const authRouter = require('./routes/authRoute');
const groupRouter = require('./routes/groupRoutes');
const bodyParser = require('body-parser');
let cors = require('cors');

const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));

app.use('/api/auth/', authRouter);
app.use('/api/users/', userRouter);
app.use('/api/posts/', postRouter);
app.use('/api/groups/', groupRouter);

module.exports = app;
