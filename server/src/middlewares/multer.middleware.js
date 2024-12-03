import multer from "multer";

// Multer disk storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/temp"); // Destination directory for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.originalname + "-" + "GoodPlots" + "-" + uniqueSuffix; // Unique filename
    cb(null, filename); // Callback with filename
  },
});

// Multer upload instance with configured storage
export const upload = multer({ storage: storage });
