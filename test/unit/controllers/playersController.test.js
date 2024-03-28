const playersController = require('../../../src/controllers/playersController');
const { prismaMock } = require('../../utils/singleton');
const { Prisma } = require('@prisma/client');

test('should get all players', async () => {
  const mReq = { query: {} };
  const mRes = { json: jest.fn() };
  const mNext = jest.fn();
  const players = [
    {
      id: 'test1',
      firstName: 'test1',
      lastName: 'test1'
    },
    {
      id: 'test2',
      firstName: 'test2',
      lastName: 'test2'
    }
  ];

  prismaMock.player.findMany.mockResolvedValue(players);
  await playersController.getAll(mReq, mRes, mNext);

  expect(mRes.json).toBeCalledWith(players);
});

test('should get all players with included gameplay', async () => {
  const mReq = { query: {} };
  const mRes = { json: jest.fn() };
  const mNext = jest.fn();
  const players = [
    {
      id: 'test1',
      firstName: 'test1',
      lastName: 'test1'
    },
    {
      id: 'test2',
      firstName: 'test2',
      lastName: 'test2'
    }
  ];

  prismaMock.player.findMany.mockResolvedValue(players);
  await playersController.getAllIncludeGameplay(mReq, mRes, mNext);

  expect(mRes.json).toBeCalledWith(players);
  expect(prismaMock.player.findMany).toBeCalledWith({
    include: {
      gameplays: {
        select: {
          onGameEnded: true,
          game: true
        }
      }
    }
  });
});

test('should get player by id', async () => {
  const mReq = { params: { id: 'test1' } };
  const mRes = { json: jest.fn() };
  const mNext = jest.fn();
  const player = {
    id: 'test1',
    firstName: 'test1',
    lastName: 'test1'
  };

  prismaMock.player.findUniqueOrThrow.mockResolvedValue(player);

  await playersController.getById(mReq, mRes, mNext);

  expect(mRes.json).toBeCalledWith(player);
  expect(prismaMock.player.findUniqueOrThrow).toBeCalledWith({
    where: {
      id: mReq.params.id
    }
  });
});

test('getting by id should return 404', async () => {
  const mReq = { params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();

  prismaMock.player.findUniqueOrThrow.mockRejectedValue(new Prisma.PrismaClientKnownRequestError('Error', { code: 'P2025' }));

  await playersController.getById(mReq, mRes, mNext);

  expect(mRes.status).toBeCalledWith(404);
  expect(mRes.send).toBeCalledWith("Item with id doesn't exists");
});

test('getting by id should throw', async () => {
  const mReq = { params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();

  prismaMock.player.findUniqueOrThrow.mockRejectedValue(new Error('invalid'));

  await playersController.getById(mReq, mRes, mNext);

  expect(mNext).toBeCalledWith(new Error('invalid'));
});

test('should create', async () => {
  const mReq = { body: { firstName: 'test1', lastName: 'test1' } };
  const mRes = { json: jest.fn() };
  const mNext = jest.fn();
  const player = {
    id: 'test1',
    firstName: 'test1',
    lastName: 'test1'
  };

  prismaMock.player.create.mockResolvedValue(player);

  await playersController.create(mReq, mRes, mNext);

  expect(mRes.json).toBeCalledWith(player);
  expect(prismaMock.player.create).toBeCalledWith({
    data: {
      firstName: mReq.body.firstName,
      lastName: mReq.body.lastName
    }
  });
});

test('should update', async () => {
  const mReq = { body: { firstName: 'test1', lastName: 'test1' }, params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();
  const player = {
    id: 'test1',
    firstName: 'test1',
    lastName: 'test1'
  };

  prismaMock.player.update.mockResolvedValue(player);

  await playersController.update(mReq, mRes, mNext);

  expect(mRes.status).toBeCalledWith(204);
  expect(prismaMock.player.update).toBeCalledWith({
    where: {
      id: mReq.params.id
    },
    data: {
      firstName: mReq.body.firstName,
      lastName: mReq.body.lastName
    }
  });
});

test('should failed update 404', async () => {
  const mReq = { body: { firstName: 'test1', lastName: 'test1' }, params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();

  prismaMock.player.update.mockRejectedValue(new Prisma.PrismaClientKnownRequestError('Error', { code: 'P2025' }));

  await playersController.update(mReq, mRes, mNext);

  expect(mRes.status).toBeCalledWith(404);
  expect(mRes.send).toBeCalledWith("Item with id doesn't exists");
});

test('should failed update other exception', async () => {
  const mReq = { body: { firstName: 'test1', lastName: 'test1' }, params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();

  prismaMock.player.update.mockRejectedValue(new Error('invalid'));

  await playersController.update(mReq, mRes, mNext);

  expect(mNext).toBeCalledWith(new Error('invalid'));
});

test('should delete', async () => {
  const mReq = { params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();

  prismaMock.player.delete.mockResolvedValue();

  await playersController.delete(mReq, mRes, mNext);

  expect(mRes.status).toBeCalledWith(204);
  expect(prismaMock.player.delete).toBeCalledWith({
    where: {
      id: mReq.params.id
    }
  });
});

test('should failed delete 404', async () => {
  const mReq = { body: { firstName: 'test1', lastName: 'test1' }, params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();

  prismaMock.player.delete.mockRejectedValue(new Prisma.PrismaClientKnownRequestError('Error', { code: 'P2025' }));

  await playersController.delete(mReq, mRes, mNext);

  expect(mRes.status).toBeCalledWith(404);
  expect(mRes.send).toBeCalledWith("Item with id doesn't exists");
});

test('should failed delete other exception', async () => {
  const mReq = { body: { firstName: 'test1', lastName: 'test1' }, params: { id: 'test1' } };
  const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const mNext = jest.fn();

  prismaMock.player.delete.mockRejectedValue(new Error('invalid'));

  await playersController.delete(mReq, mRes, mNext);

  expect(mNext).toBeCalledWith(new Error('invalid'));
});

test('search many players', async () => {
  const mReq = { query: { firstName: 'test' } };
  const mRes = { json: jest.fn() };
  const mNext = jest.fn();
  const players = [
    {
      id: 'test1',
      firstName: 'test1',
      lastName: 'test1'
    },
    {
      id: 'test2',
      firstName: 'test2',
      lastName: 'test2'
    }
  ];

  prismaMock.player.findMany.mockResolvedValue(players);
  await playersController.searchByQuery(mReq, mRes, mNext);
  expect(mRes.json).toBeCalledWith(players);
  expect(prismaMock.player.findMany).toBeCalledWith({
    where: {
      firstName: {
        contains: 'test'
      }
    }
  });
});
