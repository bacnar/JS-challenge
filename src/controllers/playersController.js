const { PrismaClient, Prisma } = require('@prisma/client');
const asyncHandler = require('express-async-handler');

const prisma = new PrismaClient();

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

  const players = await prisma.player.findMany(pagination);

  res.json(players);
});

exports.getAllIncludeGameplay = asyncHandler(async (req, res, next) => {
  const { pageSize, pageNumber } = req.query;
  let pagination = {};

  if (pageSize !== undefined && pageNumber !== undefined) {
    const skip = pageSize * (pageNumber - 1);
    pagination = {
      skip,
      take: parseInt(pageSize)
    };
  }

  // Fix that
  const players = await prisma.player.findMany({ ...pagination, ...{ include: { gameplays: { select: { onGameEnded: true, game: true } } } } });

  res.json(players);
});

exports.getById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  try {
    const content = await prisma.player.findUniqueOrThrow({
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
  const { firstName, lastName, bornDate } = req.body;

  const content = await prisma.player.create({
    data: {
      firstName,
      lastName,
      bornDate
    }
  });

  res.json(content);
});

exports.update = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, bornDate } = req.body;

  try {
    await prisma.player.update({
      where: { id },
      data: {
        firstName,
        lastName,
        bornDate
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
    await prisma.player.delete({
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

  const players = await prisma.player.findMany({
    where: params
  });

  res.json(players);
});
