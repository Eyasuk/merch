import { Schema, model } from 'mongoose';

const AdvertSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  alt: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Advert = model('advert', AdvertSchema);
export default Advert;
