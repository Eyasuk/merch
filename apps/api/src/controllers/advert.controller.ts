import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { validateInputs } from '../utils/validateForm';
import Advert from '../models/Advert';
import Collection from '../models/Collections';

export async function addAdvertHandle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validateInputs(req);
  if (!result.success) {
    return res.status(422).json({ errors: result.data });
  }

  try {
    const advertData = result.data;
    const advert = new Advert({
      name: advertData.name,
      alt: advertData.alt,
      image: advertData.image,
      addedBy: req.user.id,
    });
    await advert.save();
    return res.status(200).json(advert);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function getAdvertHandle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const pageNumber = parseInt(req.query.page as string) || 0;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = {
      totalPosts: 0,
      previous: {
        pageNumber: null,
        limit: null,
      },
      next: {
        pageNumber: null,
        limit: null,
      },
      rowsPerPage: 0,
      data: {},
    };

    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;

    const adverts = await Collection.findOne({ name: 'advert' });
    if (adverts) {
      result.totalPosts = adverts.count;
    } else {
    }
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < adverts.count) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await Advert.find().skip(startIndex).limit(limit);
    result.rowsPerPage = limit;

    return res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Sorry, something went wrong' });
  }
}

export async function deleteAdvertHandle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validateInputs(req);
  if (!result.success) {
    return res.status(422).json({ errors: result.data });
  }
  try {
    const deletedDocument = await Advert.findOneAndDelete({
      _id: result.data.id,
    });

    if (!deletedDocument) {
      return res.status(404).json({ error: 'advert not found' });
    }

    return res.status(200).json({ data: deletedDocument });
  } catch (err) {
    return res.status(500).json({ msg: 'Sorry, something went wrong' });
  }
}

export async function editAdvertHandle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validateInputs(req);
  if (!result.success) {
    return res.status(422).json({ errors: result.data });
  }

  try {
    const advertId = new Types.ObjectId(result.data.id);
    const document = await Advert.findById(advertId);

    if (!document) {
      return res.status(404).json({ error: 'advert not found' });
    }
    document.status = !document.status;
    const editedDocument = await document.save();
    return res.status(200).json({ data: editedDocument });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
}

export async function getActiveAdvertHandle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const activeAdvert = await Advert.find({ status: true });
    res.status(200).json({ data: activeAdvert });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
}
