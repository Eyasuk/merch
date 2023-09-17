import { Request, Response, NextFunction } from 'express';

export function checkAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

export function checkNotAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    return res.redirect('/api');
  }
  next();
}

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return res.status(200).json({ isLoggedIn: true });
  } else {
    return res.status(200).json({ isLoggedIn: false });
  }
}
