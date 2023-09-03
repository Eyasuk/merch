import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';

import { validateInputs } from '../utils/validateForm';

import User from '../models/User';

export async function loginHandle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validateInputs(req);
  if (!result.success) {
    return res.status(422).json({ errors: result.data });
  }
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json(user);
    });
  })(req, res, next);

  // const userData = result.data;
  // //make sure user exists
  // const user = await User.findOne({
  //   $or: [{ email: userData.email }, { phone: userData.phone }],
  // });
  // if (!user) {
  //   return res.status(404).json({
  //     message: 'invalid email or password',
  //     error: true,
  //   });
  // }
}

export async function registerHandle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validateInputs(req);
  if (!result.success) {
    return res.status(422).json({ errors: result.data });
  }
  const userData = result.data;

  let potentialUser = await User.findOne({
    $or: [{ email: userData.email }, { phone: userData.phone }],
  });

  if (potentialUser) {
    return res.status(422).json({
      message: 'user already exists',
      error: true,
    });
  }
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = new User({
    email: userData.email,
    phone: userData.phone,
    firstName: userData.first_name,
    password: hashedPassword,
  });
  user.save();
  res.redirect('/login');
}
