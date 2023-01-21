import { readFileSync, unlinkSync } from 'fs';
import sharp from 'sharp';

export async function compressImage (base64Image: string, quality: number) : Promise<string>  {
  const uri = base64Image.split(';base64,')[1];
  let imgBuffer = Buffer.from(uri, 'base64');
  const filePath = "./src/temp/temp.jpg";
  
  await sharp(imgBuffer)
    .jpeg({ quality: quality, mozjpeg: true })
    .toFile(filePath);

  const compressedBuffer = readFileSync(filePath);
  unlinkSync(filePath);
  
  const b64 = "data:image/jpg;base64," + compressedBuffer.toString('base64');

  return b64;
}
