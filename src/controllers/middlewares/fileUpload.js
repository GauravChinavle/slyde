import { log, multer } from "../../utils/index.js";

const multerUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldNameSize: 20,
    fileSize: 1024 * 1024, // 1 Mb ,
    files: 1,
  },
});

const upload = multerUpload.single("file");

function fileUpload(req, res, next) {
  const functionName = "file-upload";
  upload(req, res, function (err) {
    if (err) {
      log.error(functionName, "error while uploading file", err);
      return res.status(400).send({
        message: err.message,
      });
    }
    next();
  });
}

export default fileUpload;
