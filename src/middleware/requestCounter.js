const asyncHandler = require('express-async-handler');
const fs = require('fs/promises');

module.exports = asyncHandler(async (req, res, next) => {
  const filePath = './counter.txt';

  try {
    await fs.access(filePath);

    const rawData = await fs.readFile(filePath);
    const data = JSON.parse(rawData);

    data.counter++;
    await fs.writeFile(filePath, JSON.stringify(data));
  } catch (exception) {
    if (exception.code === 'ENOENT' && exception.syscall === 'access') {
      const data = {
        counter: 1
      };
      await fs.writeFile(filePath, JSON.stringify(data));
    } else {
      throw exception;
    }
  }

  next();
});
