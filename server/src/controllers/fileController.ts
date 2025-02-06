import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ObjectCannedACL,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || '',
  credentials: {
    accessKeyId: process.env.AWS_S3_API_KEY || '',
    secretAccessKey: process.env.AWS_S3_API_KEY_SECRET || '',
  },
});

async function getSignedUrlFromKey(key: string) {
  const s3params = {
    Bucket: process.env.S3_BUCKET_NAME || '',
    Key: key,
    ContentType: 'application/json',
  };
  const signedUrl = await getSignedUrl(
    s3Client,
    new GetObjectCommand(s3params)
  );
  return { signedUrl };
}

export const getUrl = (key: String) =>
  `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

export const uploadFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let fileToUpload: Express.Multer.File | undefined;
    if (Array.isArray(req.files)) {
      fileToUpload = req.files[0] as Express.Multer.File;
    }

    // Upload file to S3
    const key = `${uuidv4()}-${fileToUpload?.originalname}`;
    const params = {
      Bucket: process.env.S3_BUCKET_NAME || '',
      Key: key,
      Body: fileToUpload?.buffer,
      ACL: 'public-read' as ObjectCannedACL,
    };

    await s3Client.send(new PutObjectCommand(params));

    const url = getUrl(key);
    // const { signedUrl } = await getSignedUrlFromKey(key);

    res.json({
      message: 'File Uploaded successfully',
      data: { url },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving courses', error });
  }
};
