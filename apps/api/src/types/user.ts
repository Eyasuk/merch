import { UserDocument } from '../models/User';

interface ExtendedUser extends UserDocument {}

declare global {
  namespace Express {
    interface User extends ExtendedUser {}
  }
}
