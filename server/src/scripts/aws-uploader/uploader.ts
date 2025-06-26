import fs from "fs";
import { readFile } from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import {S3Client, PutObjectCommand, PutObjectCommandInput} from '@aws-sdk/client-s3';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
  accessKeyId:  process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
})

const BUCKET = process.env.S3_BUCKET_NAME || '';
const imageFolderPath = path.resolve(process.cwd(), 'src/scripts/scraper/images');

async function upload(fileName: string): Promise<void> {
  const filePath = path.join(imageFolderPath, fileName);

  if (!fs.existsSync(filePath)){
    console.error(`File not found: ${filePath}`);
    return;
  }

  const fileContent = await readFile(filePath);
  const key = `images/${fileName}`

  const params: PutObjectCommandInput = {
    Bucket: BUCKET,
    Key: key,
    Body: fileContent,
    ContentType: 'image/png',
  }

  try {
    await s3.send(new PutObjectCommand(params));
    console.log(`Uploaded: https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`)
  } catch (error) {
    console.error(`Upload failed for ${fileName}`, error);
  }
}


(async() => {

  //get array of images
  const toBeUploaded = fs.readdirSync(imageFolderPath).filter(file => file.endsWith('.png'));

  // //upload one
  // await upload(toBeUploaded[24]);

  //Upload all
  for (const file of toBeUploaded) {
    await upload(file);
  }

  // //upload first X
  // for (let i = 0; i < 5; i++) {
  //   await upload(toBeUploaded[i]);
  // }
})();
