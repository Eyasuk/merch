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
import MongoStore from 'connect-mongo';
import * as dotenv from 'dotenv';
import userAuthRouter from './routes/user/authRoute';
import adminAuthRouter from './routes/admin/authRoute';
import advertRouter from './routes/advert/advertRoute';
import productRouter from './routes/product/productRoute';

import { initializePassport } from './utils/passport-config';
import { startChangeStream } from './utils/changeStreams';

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

const mongoUri = process.env.MONGO_DB_URI;
mongoose.connect(mongoUri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
  console.log('Database connected successfully');
  await startChangeStream();
});

app.use(
  cors({
    origin: [
      'http://localhost:4200',
      'http://127.0.0.1:4200',
      'http://127.0.0.1:4201',
      'http://localhost:4201',
    ], // Replace with the actual origin of your frontend application
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true,
  })
);

app.use(express.json({ limit: '4mb' }));
app.use(express.urlencoded({ limit: '4mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
  session({
    secret: 'ss',
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: 'strict',
      secure: false,
      httpOnly: true,
      maxAge: 3600000, // Set the desired max age for the session cookie
    },
    store: MongoStore.create({
      client: db.getClient(),
      collectionName: 'session',
      stringify: false,
      autoRemove: 'interval',
      autoRemoveInterval: 1,
    }),
  })
);

initializePassport(passport);

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  req.passport = passport; // Attach passport object to the request
  next();
});

// app.use('/admin', adminPassport.initialize());
// app.use('/admin', adminPassport.session());
// app.use('/admin', (req, res, next) => {
//   req.passport = adminPassport; // Attach passport object to the request
//   next();
// });

app.use('/', userAuthRouter);
app.use('/admin', adminAuthRouter);
app.use('/advert', advertRouter);
app.use('/product', productRouter);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://127.0.0.1:${port}`);
});
server.on('error', console.error);
