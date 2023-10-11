import { Request, Response, NextFunction } from 'express';
import { cwd } from 'process';
import path from 'path';
import fs from 'fs';
import Product from '../models/Products';
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
