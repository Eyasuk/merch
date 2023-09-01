import Mongoose from 'mongoose';

const UserSchema = new Mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
});

const User = Mongoose.model('user', UserSchema);
export default User;
