import { Schema, model } from 'mongoose';
import colorValidator from '../utils/mongooseColorValidator';

const ProductsSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: [{ data: Buffer, contentType: String }],
    required: true,
  },
  productInformation: {
    type: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
  },
  category: {
    type: String,
    require: true,
  },

  colors: {
    type: [
      {
        type: String,
        validate: {
          validator: colorValidator,
          message: 'Invalid color format',
        },
      },
    ],
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
  },
  rating: {
    type: {
      one: Number,
      two: Number,
      three: Number,
      four: Number,
      five: Number,
    },
  },
  status: {
    type: Boolean,
    default: false,
  },

  completed: {
    type: Boolean,
    default: false,
  },
  totalSold: {
    type: Number,
    default: 0,
  },
});

const Products = model('products', ProductsSchema);
export default Products;
