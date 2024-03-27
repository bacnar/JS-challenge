const { PrismaClient, Prisma } = require('@prisma/client');
const asyncHandler = require('express-async-handler');

const prisma = new PrismaClient();

exports.getAll = asyncHandler(async (req, res, next) => {
  const gameplays = await prisma.gameplay.findMany();

  res.json(gameplays);
});

exports.getById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    const content = await prisma.gameplay.findUniqueOrThrow({
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
  const { gameId, playerId } = req.body;

  const content = await prisma.gameplay.create({
    data: {
      gameId,
      playerId
    }
  });

  res.json(content);
});

exports.update = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { gameId, playerId } = req.body;

  await prisma.gameplay.update({
    where: { id },
    data: {
      gameId,
      playerId
    }
  });

  res.status(204).send();
});

exports.delete = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.gameplay.delete({
      where: {
        id
      }
    });

    res.status(204).send();
  } catch (exception) {
    if (exception instanceof Prisma.RecordNotFound) {
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

  const gameplays = await prisma.gameplay.findMany({
    where: params
  });

  res.json(gameplays);
});
