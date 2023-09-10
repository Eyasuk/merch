/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport, { PassportStatic } from 'passport';
import * as path from 'path';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import authRouter from './routes/authRoute';
import { initializePassport } from './utils/passport-config';
import { checkNotAuthenticated } from './middleware/auth.middleware';
import { loginHandleValidator } from './middleware/validation-rule';
import * as auth from './controllers/auth.controller';

// declare module 'express' {
//   interface Request {
//     session: session.Session & Partial<Express.SessionData>;
//   }
// }

declare global {
  namespace Express {
    interface Request {
      passport: PassportStatic;
    }
  }
}

dotenv.config();
const app = express();

// app.use(
//   cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'], // Replace with the actual origin of your frontend application
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true,
  })
);
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(
  session({
    secret: 'ss',
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 3600000, // Set the desired max age for the session cookie
    },
  })
);

//localhost:4200/

http: app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);
app.use((req, res, next) => {
  req.passport = passport; // Attach passport object to the request
  next();
});

app.get('/api', (req, res) => {
  res.send({
    message: 'Welcome to api!',
    userLoggedIn: req.isUnauthenticated(),
  });
});

app.use('/auth', authRouter(passport));

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
