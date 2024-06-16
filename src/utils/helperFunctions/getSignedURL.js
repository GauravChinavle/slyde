import { aws } from "../requireHelper";
import log from "../helperFunctions/winstonLogger";
const { S3Client, GetObjectCommand } = aws;

async function getSignedURL(data, userID) {
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
      Key: `${process.env.AWS_KEY_ROOT}/${userID}/${Date.now()}${data.originalname}`,
      ContentType: data.mimetype,
    };
    const command = new GetObjectCommand(params);
    await s3Client.send(command);
    return params.Key;
  } catch (error) {
    log.error(functionName, "error while uploading to s3", error);
    throw new Error(error);
  }
}

export default getSignedURL;
