import gm from 'gm';

const THUMB_SIZE = 512 * 512;

export default function resizeImage(sourcePath, outPath) {
  return new Promise(resolve => {
    const gmImage = gm(sourcePath);

    gmImage.size((_err, size) => {
      const aspectRatio = size.width / size.height;

      gmImage.resize(
        Math.ceil(Math.sqrt(THUMB_SIZE * aspectRatio)),
        Math.ceil(Math.sqrt(THUMB_SIZE / aspectRatio)),
        '>'
      )
        .quality(80)
        .write(outPath, _err => {
          resolve();
        });
    });
  });
}
