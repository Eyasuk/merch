import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import Product from '../models/Products';
import ProductVariation from '../models/ProductVariant';
import { validateInputs } from '../utils/validateForm';

export async function addProductHandle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validateInputs(req);
  if (!result.success) {
    return res.status(422).json({ errors: result.data });
  }
  try {
    const productData = result.data;
    const product = new Product({
      ...productData,
      owner: req.user.id,
    });
    await product.save();
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
export async function addImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validateInputs(req);
  if (!result.success) {
    return res.status(422).json({ errors: result.data });
  }
  try {
    const product = await Product.findById(result.data.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (req.user.id != product.owner) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (!Array.isArray(req.files)) {
      return res.status(422).json({ error: 'Invalid files data' });
    }

    const filePromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        fs.readFile(file.path, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              data: data,
              contentType: file.mimetype,
            });
          }
        });
      });
    });

    const files = await Promise.all(filePromises);

    for (let i = 0; i < req.files.length; i++) {
      fs.unlink(req.files[i].path, (err) => {});
    }
    product.image = files;
    await product.save();

    return res.json(product);
  } catch (err) {
    const fileLength = Array.isArray(req.files) ? req.files.length : 0;
    for (let i = 0; i < fileLength; i++) {
      fs.unlink(req.files[i].path, (err) => {});
    }
    return res.status(500).json({ error: err.message });
  }
}

export async function getUnsavedProductHandle(req: Request, res: Response) {
  try {
    const response = await Product.findOne({
      owner: req.user.id,
      completed: false,
    });
    res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function editProductHandle(req: Request, res: Response) {
  const result = validateInputs(req);
  if (!result.success) {
    return res.status(422).json({ errors: result.data });
  }
  try {
    const product = await Product.findOne({
      owner: req.user.id,
      completed: false,
    });

    if (req.user.id != product.owner) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatePromises = Object.keys(result.data).map(async (field) => {
      if (product.get(field) !== undefined) {
        product[field] = result.data[field];
      }
    });

    await Promise.all(updatePromises);

    const newProduct = await product.save();

    res.status(200).json(newProduct);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function editProductVariationHandle(req: Request, res: Response) {
  const result = validateInputs(req);
  if (!result.success) {
    return res.status(422).json({ errors: result.data });
  }
  try {
    const product = await Product.findById(result.data.productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (req.user.id != product.owner) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (!Array.isArray(req.files)) {
      return res.status(422).json({ error: 'Invalid files data' });
    }

    const filePromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        fs.readFile(file.path, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              color: file.fieldname.slice(9, -1),
              data: data,
              contentType: file.mimetype,
            });
          }
        });
      });
    });

    const files = await Promise.all(filePromises);
    for (let i = 0; i < req.files.length; i++) {
      fs.unlink(req.files[i].path, (err) => {});
    }

    const productVariation = await ProductVariation.findOne({
      product: result.data.productId,
    });

    if (productVariation) {
      const colorData = result.data.color.map((data) => {
        const image: any = files.filter((img: any) => {
          return img.color == data.color;
        });
        const pro = productVariation.color.filter((value) => {
          return value.color == data.color;
        });

        return {
          stock: data.stock ? data.stock : pro[0].stock,
          price: data.price ? data.price : pro[0].price,
          color: data.color ? data.color : pro[0].color,
          image: image[0]
            ? {
                data: image[0]?.data,
                contentType: image[0]?.contentType,
              }
            : pro[0].image,
        };
      });
      productVariation.color = colorData;
      await productVariation.save();
      return res.status(200).json(productVariation);
    } else {
      const colorData = result.data.color.map((data) => {
        const image: any = files.filter((img: any) => {
          return img.color == data.color;
        });

        return {
          stock: data?.stock,
          price: data?.price,
          color: data?.color,
          image: {
            data: image[0]?.data,
            contentType: image[0]?.contentType,
          },
        };
      });
      const newProductVariation = new ProductVariation({
        product: result.data.productId,
        color: colorData,
      });
      await newProductVariation.save();
      return res.status(200).json(newProductVariation);
    }
  } catch (err) {
    const fileLength = Array.isArray(req.files) ? req.files.length : 0;

    for (let i = 0; i < fileLength; i++) {
      fs.unlink(req.files[i].path, (err) => {});
    }
    return res.status(500).json({ error: err.message });
  }
}
