import { Schema, model } from 'mongoose';

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
