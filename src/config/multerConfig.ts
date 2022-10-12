import { Options, diskStorage } from "multer";
import { randomBytes } from "crypto";
import { Request } from "express";

const multerConfig = {
  storage: diskStorage({
    destination: (req: Request, file, callback) => {
      const path = req.route.path.split("/")[1];
      if (path === "cars") callback(null, "./src/tmp/car-images");
      else callback(null, "./src/tmp/avatars");
    },

    filename: (req, file, callback) => {
      randomBytes(16, (err, hash) => {
        if (err) callback(err, file.filename);

        const fileName = `${hash.toString("hex")}-${file.originalname
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")}`.replaceAll("%", "");

        callback(null, fileName);
      });
    },
  }),

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },

  fileFilter: (req: Request, file, callback) => {
    const allowedMimes = ["image/jpeg", "image/jpg", "image/png"];

    if (allowedMimes.includes(file.mimetype)) callback(null, true);
    else callback(new Error("Invalid mime type."));
  },
} as Options;

export default multerConfig;
