import multer from 'multer';
import path from 'path';

var storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, path.join(process.cwd() + '/apps/api/uploads'));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + '-' + Math.round(Math.random() * 1e9) + file.originalname
    );
  },
});

const upload = multer({
  storage: storage,
});

export default upload;
