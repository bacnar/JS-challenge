const gameplaysController = require('../../../src/controllers/gameplaysController');
const { prismaMock } = require('../../utils/singleton');
const { Prisma } = require('@prisma/client');

test('should get all gameplays', async () => {
  const mReq = {};
  const mRes = { json: jest.fn() };
  const mNext = jest.fn();
  const gameplays = [
    {
      id: 'test1',
      gameId: 'test1',
      playerId: 'test1'
    },
    {
      id: 'test2',
      gameId: 'test2',
      playerId: 'test2'
    }
  ];

  prismaMock.gameplay.findMany.mockResolvedValue(gameplays);
  await gameplaysController.getAll(mReq, mRes, mNext);

  expect(mRes.json).toBeCalledWith(gameplays);
});

test('should get gameplay by id', async () => {
  const mReq = { params: { id: 'test1' } };
  const mRes = { json: jest.fn() };
  const mNext = jest.fn();
  const gameplay = {
    id: 'test1',
    gameId: 'test1',
    playerId: 'test1'
  };

  prismaMock.gameplay.findUniqueOrThrow.mockResolvedValue(gameplay);

  await gameplaysController.getById(mReq, mRes, mNext);

  expect(mRes.json).toBeCalledWith(gameplay);
  expect(prismaMock.gameplay.findUniqueOrThrow).toBeCalledWith({
    where: {
      id: mReq.params.id
    }
  });
});

test('getting by id should return 404', async () => {
  const mReq = { params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();

  prismaMock.gameplay.findUniqueOrThrow.mockRejectedValue(new Prisma.PrismaClientKnownRequestError('Error', { code: 'P2025' }));

  await gameplaysController.getById(mReq, mRes, mNext);

  expect(mRes.status).toBeCalledWith(404);
  expect(mRes.send).toBeCalledWith("Item with id doesn't exists");
});

test('getting by id should throw', async () => {
  const mReq = { params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();

  prismaMock.gameplay.findUniqueOrThrow.mockRejectedValue(new Error('invalid'));

  await gameplaysController.getById(mReq, mRes, mNext);

  expect(mNext).toBeCalledWith(new Error('invalid'));
});

test('should create', async () => {
  const mReq = { body: { gameId: 'test1', playerId: 'test1' } };
  const mRes = { json: jest.fn() };
  const mNext = jest.fn();
  const gameplay = {
    id: 'test1',
    gameId: 'test1',
    playerId: 'test1'
  };

  prismaMock.gameplay.create.mockResolvedValue(gameplay);

  await gameplaysController.create(mReq, mRes, mNext);

  expect(mRes.json).toBeCalledWith(gameplay);
  expect(prismaMock.gameplay.create).toBeCalledWith({
    data: {
      gameId: mReq.body.gameId,
      playerId: mReq.body.playerId
    }
  });
});

test('should update', async () => {
  const mReq = { body: { gameId: 'test1', playerId: 'test1' }, params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();
  const gameplay = {
    id: 'test1',
    gameId: 'test1',
    playerId: 'test1'
  };

  prismaMock.gameplay.update.mockResolvedValue(gameplay);

  await gameplaysController.update(mReq, mRes, mNext);

  expect(mRes.status).toBeCalledWith(204);
  expect(prismaMock.gameplay.update).toBeCalledWith({
    where: {
      id: mReq.params.id
    },
    data: {
      gameId: mReq.body.gameId,
      playerId: mReq.body.playerId
    }
  });
});

test('should failed update 404', async () => {
  const mReq = { body: { gameId: 'test1', playerId: 'test1' }, params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();

  prismaMock.gameplay.update.mockRejectedValue(new Prisma.PrismaClientKnownRequestError('Error', { code: 'P2025' }));

  await gameplaysController.update(mReq, mRes, mNext);

  expect(mRes.status).toBeCalledWith(404);
  expect(mRes.send).toBeCalledWith("Item with id doesn't exists");
});

test('should failed update other exception', async () => {
  const mReq = { body: { gameId: 'test1', playerId: 'test1' }, params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();

  prismaMock.gameplay.update.mockRejectedValue(new Error('invalid'));

  await gameplaysController.update(mReq, mRes, mNext);

  expect(mNext).toBeCalledWith(new Error('invalid'));
});

test('should delete', async () => {
  const mReq = { params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();

  prismaMock.gameplay.delete.mockResolvedValue();

  await gameplaysController.delete(mReq, mRes, mNext);

  expect(mRes.status).toBeCalledWith(204);
  expect(prismaMock.gameplay.delete).toBeCalledWith({
    where: {
      id: mReq.params.id
    }
  });
});

test('should failed delete 404', async () => {
  const mReq = { body: { gameId: 'test1', playerId: 'test1' }, params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();

  prismaMock.gameplay.delete.mockRejectedValue(new Prisma.PrismaClientKnownRequestError('Error', { code: 'P2025' }));

  await gameplaysController.delete(mReq, mRes, mNext);

  expect(mRes.status).toBeCalledWith(404);
  expect(mRes.send).toBeCalledWith("Item with id doesn't exists");
});

test('should failed delete other exception', async () => {
  const mReq = { body: { gameId: 'test1', playerId: 'test1' }, params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();

  prismaMock.gameplay.delete.mockRejectedValue(new Error('invalid'));

  await gameplaysController.delete(mReq, mRes, mNext);

  expect(mNext).toBeCalledWith(new Error('invalid'));
});

test('search many gameplays', async () => {
  const mReq = { query: { gameId: 'test' } };
  const mRes = { json: jest.fn() };
  const mNext = jest.fn();
  const gameplays = [
    {
      id: 'test1',
      gameId: 'test1',
      playerId: 'test1'
    },
    {
      id: 'test2',
      gameId: 'test2',
      playerId: 'test2'
    }
  ];

  prismaMock.gameplay.findMany.mockResolvedValue(gameplays);
  await gameplaysController.searchByQuery(mReq, mRes, mNext);
  expect(mRes.json).toBeCalledWith(gameplays);
  expect(prismaMock.gameplay.findMany).toBeCalledWith({
    where: {
      gameId: {
        contains: 'test'
      }
    }
  });
});
