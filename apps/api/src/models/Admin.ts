import { Document, Model, Schema, model } from 'mongoose';

export interface AdminDocument extends Document {
  email?: string;
  phone?: string;
  firstName: string;
  password: string;
}

const AdminSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
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

const Admin = model('admin', AdminSchema);
export default Admin;
