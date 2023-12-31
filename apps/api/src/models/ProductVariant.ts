import { Schema, model } from 'mongoose';
import colorValidator from '../utils/mongooseColorValidator';

const ProductVariantsSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'products',
    unique: true,
  },
  color: {
    type: [
      {
        image: { data: Buffer, contentType: String },
        color: {
          type: String,
          validate: {
            validator: colorValidator,
            message: 'Invalid color format',
          },
        },
        stock: Number,
        price: Number,
      },
    ],
  },

  others: {
    type: [
      {
        name: String,
        variants: [
          {
            name: String,
            image: String,
            color: {
              type: String,
              validate: {
                validator: colorValidator,
                message: 'Invalid color format',
              },
            },
            stock: Number,
            description: String,
            price: Number,
          },
        ],
      },
    ],
  },
});

const ProductVariants = model('productVariants', ProductVariantsSchema);
export default ProductVariants;
