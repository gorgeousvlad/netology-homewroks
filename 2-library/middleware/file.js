const multer = require('multer');

const PUBLIC_PATH =  '/../public/books';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + PUBLIC_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
  }
})

// const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

// const fileFilter = (req, file, cb) => {
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true)
//   } else {
//     cb(null, false)
//   }
// };

var upload = multer({
    storage: storage,
    // fileFilter,
    onFileUploadStart: function (file) {
      console.log(file.originalname + ' is starting ...')
    },
});

module.exports = upload;