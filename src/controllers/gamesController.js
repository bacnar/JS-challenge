const asyncHandler = require('express-async-handler');
const { Prisma } = require('@prisma/client');

const prisma = require('../utils/client');

exports.getAll = asyncHandler(async (req, res, next) => {
  const { pageSize, pageNumber } = req.query;
  let pagination = {};

  if (pageSize !== undefined && pageNumber !== undefined) {
    const skip = pageSize * (pageNumber - 1);
    pagination = {
      skip,
      take: parseInt(pageSize)
    };
  }

  const games = await prisma.game.findMany(pagination);

  res.json(games);
});

exports.getById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    const content = await prisma.game.findUniqueOrThrow({
      where: { id }
    });

    res.json(content);
  } catch (exception) {
    if (exception instanceof Prisma.PrismaClientKnownRequestError && exception.code === 'P2025') {
      res.status(404).send("Item with id doesn't exists");
    } else {
      throw exception;
    }
  }
});

exports.create = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;

  const content = await prisma.game.create({
    data: {
      title,
      description
    }
  });

  res.json(content);
});

exports.update = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    await prisma.game.update({
      where: { id },
      data: {
        title,
        description
      }
    });

    res.status(204).send();
  } catch (exception) {
    if (exception instanceof Prisma.PrismaClientKnownRequestError && exception.code === 'P2025') {
      res.status(404).send("Item with id doesn't exists");
    } else {
      throw exception;
    }
  }
});

exports.delete = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.game.delete({
      where: {
        id
      }
    });

    res.status(204).send();
  } catch (exception) {
    if (exception instanceof Prisma.PrismaClientKnownRequestError && exception.code === 'P2025') {
      res.status(404).send("Item with id doesn't exists");
    } else {
      throw exception;
    }
  }
});

exports.searchByQuery = asyncHandler(async (req, res, next) => {
  const searchKeyVal = req.query;
  const params = {};

  Object.keys(searchKeyVal).forEach(key => {
    params[key] = { contains: searchKeyVal[key] };
  });

  const games = await prisma.game.findMany({
    where: params
  });

  res.json(games);
});
