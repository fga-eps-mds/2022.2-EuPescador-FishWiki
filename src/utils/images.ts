import { readFileSync, unlinkSync, existsSync, mkdirSync } from 'fs';
import sharp from 'sharp';

export async function compressImage(
  base64Image: string,
  quality: number
): Promise<string> {
  const uri = base64Image.split(';base64,')[1];
  const imgBuffer = Buffer.from(uri, 'base64');
  const filePath = './src/temp/temp.jpg';

  if (!existsSync('./src/temp')) mkdirSync('./src/temp');

  await sharp(imgBuffer).jpeg({ quality, mozjpeg: true }).toFile(filePath);

  const compressedBuffer = readFileSync(filePath);
  unlinkSync(filePath);

  return `data:image/jpg;base64,${compressedBuffer.toString('base64')}`;
}

export default compressImage;
