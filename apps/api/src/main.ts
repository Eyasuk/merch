/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import flash from 'express-flash';
import * as path from 'path';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import authRouter from './routes/authRoute';
import { initializePassport } from './utils/passport-config';

dotenv.config();
initializePassport(passport);
const app = express();

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(
  session({
    secret: 'ss',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.use('/', authRouter);

const mongoUri = process.env.MONGO_DB_URI;
mongoose.connect(mongoUri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Database connected successfully');
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://127.0.0.1:${port}`);
});
server.on('error', console.error);
