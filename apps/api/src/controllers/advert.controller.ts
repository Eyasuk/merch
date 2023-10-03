import { Request, Response, NextFunction } from 'express';
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
    console.log('called');
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
    console.log('called 1');

    return res.status(200).json({ data: result });
    console.log('called 3');
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Sorry, something went wrong' });
  }
}
