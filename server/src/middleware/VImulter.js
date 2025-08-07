import multer from "multer";
import path from "path";
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "ReviewIV");
  },
  filename: (req, file, cb) => {
    const uniquename = Date.now() + path.extname(file.originalname);
    cb(null, uniquename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowType = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "video/mp4",
    "video/quicktime",
    "video/mov",
  ];
  console.log("Incoming file:", file.originalname, file.mimetype);
  if (allowType.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image and videos are allowed"));
  }
};

const Rupload = multer({
  storage: Storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

export default Rupload;
