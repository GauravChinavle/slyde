import { aws } from "../requireHelper.js";
import log from "../helperFunctions/winstonLogger.js";
const { S3Client, PutObjectCommand } = aws;

async function uploadToS3(data, userID) {
  const functionName = "uploadToS3";
  try {
    const s3Client = new S3Client({
      region: process.env.region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Body: data.buffer,
      Key: `${process.env.AWS_KEY_ROOT}/${userID}/${Date.now()}${data.originalname}`,
      ContentType: data.mimetype,
    };
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return params.Key;
  } catch (error) {
    log.error(functionName, "error while uploading to s3", error);
    throw new Error(error);
  }
}

export default uploadToS3;
