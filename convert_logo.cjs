const Jimp = require('jimp');

Jimp.read('src/images/aiml logo.jpeg')
  .then(img => {
    const w = img.getWidth();
    const h = img.getHeight();
    const radius = Math.min(w, h) / 2;
    const cx = w / 2;
    const cy = h / 2;
    
    img.scan(0, 0, w, h, function(x, y, idx) {
      const dist = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
      if (dist > radius) {
        this.bitmap.data[idx + 3] = 0; // Set alpha to 0 (transparent)
      }
    });
    
    return img.writeAsync('src/images/aiml_logo_circle.png');
  })
  .then(() => {
    console.log('Image converted successfully. Saved to src/images/aiml_logo_circle.png');
  })
  .catch(err => {
    console.error('Error converting image:', err);
  });
