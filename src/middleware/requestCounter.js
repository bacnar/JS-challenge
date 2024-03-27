const asyncHandler = require('express-async-handler');
const fs = require('fs/promises');

module.exports = asyncHandler(async (req, res, next) => {
  const filePath = './counter.txt';
  // Properly implement try catch
  try {
    try {
      await fs.access(filePath);
      const rawData = await fs.readFile(filePath);
      const data = JSON.parse(rawData);
      data.counter++;
      await fs.writeFile(filePath, JSON.stringify(data));
    } catch {
      const data = {
        counter: 1
      };
      await fs.writeFile(filePath, JSON.stringify(data));
    }
  } catch (err) {
    console.error('Error while writing counter:', err);
  }

  next();
});
