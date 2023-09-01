import Mongoose from 'mongoose';

const CreatorSchema = new Mongoose.Schema({
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
  storeName: {
    type: String,
    unique: true,
    required: true,
  },
});

const Creator = Mongoose.model('creator', CreatorSchema);
export default Creator;
