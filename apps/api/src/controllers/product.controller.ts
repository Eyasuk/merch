import { Request, Response, NextFunction } from 'express';
import { validateInputs } from '../utils/validateForm';

export function addProductHandle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validateInputs(req);
  if (!result.success) {
    return res.status(422).json({ errors: result.data });
  }
  return res.status(200).json({ success: 'success' });
}
