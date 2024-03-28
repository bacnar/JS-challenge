const gamesController = require('../../../src/controllers/gamesController');
const { prismaMock } = require('../../utils/singleton');
const { Prisma } = require('@prisma/client');

test('should get all games', async () => {
  const mReq = { query: {} };
  const mRes = { json: jest.fn() };
  const mNext = jest.fn();
  const games = [
    {
      id: 'test1',
      title: 'test1',
      description: 'test1'
    },
    {
      id: 'test2',
      title: 'test2',
      description: 'test2'
    }
  ];

  prismaMock.game.findMany.mockResolvedValue(games);
  await gamesController.getAll(mReq, mRes, mNext);

  expect(mRes.json).toBeCalledWith(games);
});

test('should get game by id', async () => {
  const mReq = { params: { id: 'test1' } };
  const mRes = { json: jest.fn() };
  const mNext = jest.fn();
  const game = {
    id: 'test1',
    title: 'test1',
    description: 'test1'
  };

  prismaMock.game.findUniqueOrThrow.mockResolvedValue(game);

  await gamesController.getById(mReq, mRes, mNext);

  expect(mRes.json).toBeCalledWith(game);
  expect(prismaMock.game.findUniqueOrThrow).toBeCalledWith({
    where: {
      id: mReq.params.id
    }
  });
});

test('getting by id should return 404', async () => {
  const mReq = { params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();

  prismaMock.game.findUniqueOrThrow.mockRejectedValue(new Prisma.PrismaClientKnownRequestError('Error', { code: 'P2025' }));

  await gamesController.getById(mReq, mRes, mNext);

  expect(mRes.status).toBeCalledWith(404);
  expect(mRes.send).toBeCalledWith("Item with id doesn't exists");
});

test('getting by id should throw', async () => {
  const mReq = { params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();

  prismaMock.game.findUniqueOrThrow.mockRejectedValue(new Error('invalid'));

  await gamesController.getById(mReq, mRes, mNext);

  expect(mNext).toBeCalledWith(new Error('invalid'));
});

test('should create', async () => {
  const mReq = { body: { title: 'test1', description: 'test1' } };
  const mRes = { json: jest.fn() };
  const mNext = jest.fn();
  const game = {
    id: 'test1',
    title: 'test1',
    description: 'test1'
  };

  prismaMock.game.create.mockResolvedValue(game);

  await gamesController.create(mReq, mRes, mNext);

  expect(mRes.json).toBeCalledWith(game);
  expect(prismaMock.game.create).toBeCalledWith({
    data: {
      title: mReq.body.title,
      description: mReq.body.description
    }
  });
});

test('should update', async () => {
  const mReq = { body: { title: 'test1', description: 'test1' }, params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();
  const game = {
    id: 'test1',
    title: 'test1',
    description: 'test1'
  };

  prismaMock.game.update.mockResolvedValue(game);

  await gamesController.update(mReq, mRes, mNext);

  expect(mRes.status).toBeCalledWith(204);
  expect(prismaMock.game.update).toBeCalledWith({
    where: {
      id: mReq.params.id
    },
    data: {
      title: mReq.body.title,
      description: mReq.body.description
    }
  });
});

test('should failed update 404', async () => {
  const mReq = { body: { title: 'test1', description: 'test1' }, params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();

  prismaMock.game.update.mockRejectedValue(new Prisma.PrismaClientKnownRequestError('Error', { code: 'P2025' }));

  await gamesController.update(mReq, mRes, mNext);

  expect(mRes.status).toBeCalledWith(404);
  expect(mRes.send).toBeCalledWith("Item with id doesn't exists");
});

test('should failed update other exception', async () => {
  const mReq = { body: { title: 'test1', description: 'test1' }, params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();

  prismaMock.game.update.mockRejectedValue(new Error('invalid'));

  await gamesController.update(mReq, mRes, mNext);

  expect(mNext).toBeCalledWith(new Error('invalid'));
});

test('should delete', async () => {
  const mReq = { params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();

  prismaMock.game.delete.mockResolvedValue();

  await gamesController.delete(mReq, mRes, mNext);

  expect(mRes.status).toBeCalledWith(204);
  expect(prismaMock.game.delete).toBeCalledWith({
    where: {
      id: mReq.params.id
    }
  });
});

test('should failed delete 404', async () => {
  const mReq = { body: { title: 'test1', description: 'test1' }, params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();

  prismaMock.game.delete.mockRejectedValue(new Prisma.PrismaClientKnownRequestError('Error', { code: 'P2025' }));

  await gamesController.delete(mReq, mRes, mNext);

  expect(mRes.status).toBeCalledWith(404);
  expect(mRes.send).toBeCalledWith("Item with id doesn't exists");
});

test('should failed delete other exception', async () => {
  const mReq = { body: { title: 'test1', description: 'test1' }, params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();

  prismaMock.game.delete.mockRejectedValue(new Error('invalid'));

  await gamesController.delete(mReq, mRes, mNext);

  expect(mNext).toBeCalledWith(new Error('invalid'));
});

test('search many games', async () => {
  const mReq = { query: { title: 'test' } };
  const mRes = { json: jest.fn() };
  const mNext = jest.fn();
  const games = [
    {
      id: 'test1',
      title: 'test1',
      description: 'test1'
    },
    {
      id: 'test2',
      title: 'test2',
      description: 'test2'
    }
  ];

  prismaMock.game.findMany.mockResolvedValue(games);
  await gamesController.searchByQuery(mReq, mRes, mNext);
  expect(mRes.json).toBeCalledWith(games);
  expect(prismaMock.game.findMany).toBeCalledWith({
    where: {
      title: {
        contains: 'test'
      }
    }
  });
});
