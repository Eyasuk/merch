import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { validateInputs } from '../utils/validateForm';
import User from '../models/User';

export async function userLoginHandle(
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

export async function adminLoginHandle(
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
    if (!user.role.includes('admin')) {
      return res.status(401).json({ message: 'not an admin' });
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

export async function userRegisterHandle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validateInputs(req);
  if (!result.success) {
    return res.status(422).json({ errors: result.data });
  }
  const userData = result.data;

  let potentialUser = true;

  if (
    (userData.email && (await User.findOne({ email: userData.email }))) ||
    (userData.phone && (await User.findOne({ email: userData.phone })))
  )
    potentialUser = false;

  if (!potentialUser) {
    return res.status(409).json({
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
  await user.save();
  req.logIn(user, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    req.session.save(() => {
      return res.status(200).json(user);
    });
  });
}

export function checkAdminAuthHandle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated() && req.user.role.includes('admin')) {
    return res.status(200).json({ isLoggedIn: true });
  } else {
    return res.status(200).json({ isLoggedIn: false });
  }
}

export function checkAuthHandle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    return res.status(200).json({ isLoggedIn: true });
  } else {
    return res.status(200).json({ isLoggedIn: false });
  }
}

export function logout(req: Request, res: Response, next: NextFunction) {
  req.logout(function (err) {
    if (err) {
      return res.status(500).json({ success: false });
    }
    return res.status(200).json({ success: true });
  });
}
