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
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.status(200).json({ isLoggedIn: true });
  } else {
    res.status(401).json({ isLoggedIn: false });
  }
}
