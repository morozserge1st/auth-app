const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/User');
const authRouter = require('./routes/Auth');

const { port } = require('./config');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(port);
