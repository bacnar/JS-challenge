const asyncHandler = require('express-async-handler');

exports.getAll = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Get');
});

exports.getById = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: GetById');
});

exports.create = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Create');
});

exports.update = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Update');
});

exports.delete = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: Delete');
});

exports.searchByQuery = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: SearchByQuery');
});
