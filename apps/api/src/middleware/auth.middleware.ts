import { Request, Response, NextFunction } from 'express';

export function checkAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).json({ message: 'not authorized' });
}

export function checkNotAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    return res.status(200).json(req.user);
  }
  next();
}

export function checkAdmin(req: Request, res: Response, next: NextFunction) {
  const { role } = req.user;
  if (role == 'admin') {
    next();
  } else {
    return res.status(401).json({ message: 'not authorized', a: role });
  }
}
