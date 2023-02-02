import { readFileSync, unlinkSync, existsSync, mkdirSync } from 'fs';
import sharp from 'sharp';
import { v4 as uuidV4 } from 'uuid';

export async function compressImage(
  base64Image: string,
  quality: number
): Promise<string> {
  const uri = base64Image.split(';base64,')[1];
  const imgBuffer = Buffer.from(uri, 'base64');
  const extension = base64Image.split(';')[0].split('/')[1];
  const id = uuidV4();
  const filePath = `./src/temp/${id}.${extension}`;

  if (!existsSync('./src/temp')) mkdirSync('./src/temp');

  if (extension === 'jpg')
    await sharp(imgBuffer).jpeg({ quality, mozjpeg: true }).toFile(filePath);
  else if (extension === 'png')
    await sharp(imgBuffer)
      .png({ quality, compressionLevel: 7 })
      .toFile(filePath);
  else return base64Image;

  const compressedBuffer = readFileSync(filePath);
  unlinkSync(filePath);

  return `data:image/${extension};base64,${compressedBuffer.toString(
    'base64'
  )}`;
}

export default compressImage;
