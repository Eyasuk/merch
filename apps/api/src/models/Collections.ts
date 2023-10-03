import { Schema, model } from 'mongoose';

const CollectionSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

const Collection = model('collection', CollectionSchema);
export default Collection;
