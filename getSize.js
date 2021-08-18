const { generateMinifiedSizes } = require("minified-size");

const resultGenerator = generateMinifiedSizes({
  files: ["dist/**/*.(js|css|html)"],
});

const gzipped = [];
const minified = [];

const run = async () => {
  for (;;) {
    const result = await resultGenerator.next();
    if (result.done) {
      break;
    }
    const {
      error,
      file,
      originalSize,
      minifiedSize,
      gzippedSize,
      brotliedSize,
    } = result.value;
    if (!error) {
      console.info(
        `${file}: ${originalSize}, ${minifiedSize}, ${gzippedSize}, ${brotliedSize}`
      );
      gzipped.push(gzippedSize);
      minified.push(minifiedSize);
    } else {
      console.error(`${file}: ${error}`);
    }
  }
  console.log({
    gzippedSize: gzipped.reduce((a, b) => a + b),
    minifiedSize: minified.reduce((a, b) => a + b),
  });
};

run();
