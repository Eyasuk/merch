import { Request, Response, NextFunction } from 'express';

export function checkAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).json({ message: 'not authenticated' });
  }
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
  if (req.user && req.user.role.includes('admin')) {
    next();
  } else {
    return res.status(401).json({ message: 'not authorized' });
  }
}

export function checkCreator(req: Request, res: Response, next: NextFunction) {
  if (req.user && req.user.role.includes('creator')) {
    next();
  } else {
    return res.status(401).json({ message: 'not authorized' });
  }
}
