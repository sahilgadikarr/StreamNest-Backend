import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) // many files might have same name, so make it named unique
    }
  })
  
  export const upload = multer({ storage: storage })
  