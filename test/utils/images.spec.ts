import fs from 'fs';
import sharp from 'sharp';
import compressImage from '../../src/utils/images';

if (!fs.existsSync('./src/temp')) fs.mkdirSync('./src/temp');
describe('Test libary compress mobile image', () => {
  it('Should create src folder and compress image', async () => {
    fs.existsSync = jest.fn().mockImplementation(() => false);
    fs.mkdirSync = jest.fn().mockImplementation(() => true);
    sharp().jpeg().toFile = jest.fn().mockImplementation(() => true);

    const img =
      'data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//' +
      '//////////////////////////////////////////////////////////' +
      '//////////////////////////2wBDAf//////////////////////////' +
      '//////////////////////////////////////////////////////////' +
      '//wAARCAAPABQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAH/' +
      'xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP' +
      '/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKqKAAD/2Q==';

    const saida =
      'data:image/jpg;base64,/9j/2wBDAP//////////////////////////' +
      '//////////////////////////////////////////////////////////' +
      '//2wBDAf//////////////////////////////////////////////////' +
      '////////////////////////////////////wgARCAAPABQDASIAAhEBAx' +
      'EB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAH/xAAUAQEAAAAAAAAAAAAAAAAA' +
      'AAAA/9oADAMBAAIQAxAAAAC2UA//xAAUEAEAAAAAAAAAAAAAAAAAAAAg/9' +
      'oACAEBAAE/AF//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAECAQE/AD//' +
      'xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAEDAQE/AD//2Q==';

    const result = await compressImage(img, 1);
    expect(result).toBe(saida);
  });

  it('Should compress image', async () => {
    if (!fs.existsSync('./src/temp')) fs.mkdirSync('./src/temp');
    fs.existsSync = jest.fn().mockImplementation(() => true);
    fs.mkdirSync = jest.fn().mockImplementation(() => null);

    const img =
      'data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//' +
      '//////////////////////////////////////////////////////////' +
      '//////////////////////////2wBDAf//////////////////////////' +
      '//////////////////////////////////////////////////////////' +
      '//wAARCAAPABQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAH/' +
      'xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP' +
      '/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKqKAAD/2Q==';

    const saida =
      'data:image/jpg;base64,/9j/2wBDAP//////////////////////////' +
      '//////////////////////////////////////////////////////////' +
      '//2wBDAf//////////////////////////////////////////////////' +
      '////////////////////////////////////wgARCAAPABQDASIAAhEBAx' +
      'EB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAH/xAAUAQEAAAAAAAAAAAAAAAAA' +
      'AAAA/9oADAMBAAIQAxAAAAC2UA//xAAUEAEAAAAAAAAAAAAAAAAAAAAg/9' +
      'oACAEBAAE/AF//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAECAQE/AD//' +
      'xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAEDAQE/AD//2Q==';

    const result = await compressImage(img, 1);
    expect(result).toBe(saida);
  });
});
