import Mongoose from 'mongoose';

const AdminSchema = new Mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
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

const Admin = Mongoose.model('admin', AdminSchema);
export default Admin;
