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
  color: {
    type: String,
    require: true,
  },
});

const Advert = model('adverts', AdvertSchema);
export default Advert;
