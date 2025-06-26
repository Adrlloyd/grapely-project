"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_s3_1 = require("@aws-sdk/client-s3");
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env') });
const s3 = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
});
const BUCKET = process.env.S3_BUCKET_NAME || '';
const imageFolderPath = path_1.default.resolve(process.cwd(), 'src/scripts/scraper/images');
async function upload(fileName) {
    const filePath = path_1.default.join(imageFolderPath, fileName);
    if (!fs_1.default.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }
    const fileContent = await (0, promises_1.readFile)(filePath);
    const key = `images/${fileName}`;
    const params = {
        Bucket: BUCKET,
        Key: key,
        Body: fileContent,
        ContentType: 'image/png',
    };
    try {
        await s3.send(new client_s3_1.PutObjectCommand(params));
        console.log(`Uploaded: https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`);
    }
    catch (error) {
        console.error(`Upload failed for ${fileName}`, error);
    }
}
(async () => {
    //get array of images
    const toBeUploaded = fs_1.default.readdirSync(imageFolderPath).filter(file => file.endsWith('.png'));
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
