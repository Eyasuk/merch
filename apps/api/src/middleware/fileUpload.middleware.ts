import multer from 'multer';

var storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set a unique filename for the uploaded image
  },
});

const upload = multer({ storage: storage });

export default upload;
