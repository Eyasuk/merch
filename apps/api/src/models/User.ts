import { Document, Model, Schema, model } from 'mongoose';

export interface UserDocument extends Document {
  email?: string;
  phone?: string;
  firstName: string;
  role?: 'user' | 'admin' | 'creator' | 'moderator';
}

const UserSchema = new Schema({
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin', 'creator', 'moderator'],
    default: 'user',
  },
});

const User = model('user', UserSchema);
export default User;
