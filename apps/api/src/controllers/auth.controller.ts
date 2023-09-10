import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

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
  req.passport.authenticate('local', { session: true }, (err, user, info) => {
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
      req.session.save(() => {
        return res.status(200).json(user);
      });
    });
  })(req, res, next);
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
  req.logIn(user, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(201).json(user);
  });
}

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  console.log(req.session);

  if (req.isAuthenticated()) {
    res.json({ isLoggedIn: true });
  } else {
    res.json({ isLoggedIn: false });
  }
  next();
}
