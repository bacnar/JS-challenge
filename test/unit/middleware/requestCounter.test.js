const requestCounter = require('../../../src/middleware/requestCounter');
const fs = require('fs/promises');

test('should access and write', async () => {
  const mReq = {};
  const mRes = { };
  const mNext = jest.fn();
  const filePath = './counter.txt';
  const fileText = '{"counter":33}';
  const fileTextExpected = '{"counter":34}';
  jest.mock('fs/promises');

  fs.access = jest.fn().mockResolvedValue();
  fs.readFile = jest.fn().mockResolvedValue(fileText);
  fs.writeFile = jest.fn().mockResolvedValue();

  await requestCounter(mReq, mRes, mNext);

  expect(fs.writeFile).toBeCalledWith(filePath, fileTextExpected);
  expect(mNext).toBeCalledWith();
});

test('should create new and write', async () => {
  const mReq = {};
  const mRes = { };
  const mNext = jest.fn();
  const filePath = './counter.txt';
  const fileTextExpected = '{"counter":1}';
  jest.mock('fs/promises');

  fs.access = jest.fn().mockRejectedValue({ code: 'ENOENT', syscall: 'access' });
  fs.writeFile = jest.fn().mockResolvedValue();

  await requestCounter(mReq, mRes, mNext);

  expect(fs.writeFile).toBeCalledWith(filePath, fileTextExpected);
  expect(mNext).toBeCalledWith();
});

test('should throw exception', async () => {
  const mReq = {};
  const mRes = { };
  const mNext = jest.fn();
  jest.mock('fs/promises');

  fs.access = jest.fn().mockRejectedValue(new Error('Test'));

  await requestCounter(mReq, mRes, mNext);

  expect(mNext).toBeCalledWith(new Error('Test'));
});

/* test('should create new user ', async () => {
  const user = {
    id: 1,
    name: 'Rich',
    email: 'hello@prisma.io',
    acceptTermsAndConditions: true
  }

  prismaMock.user.create.mockResolvedValue(user)

  await expect(createUser(user)).resolves.toEqual({
    id: 1,
    name: 'Rich',
    email: 'hello@prisma.io',
    acceptTermsAndConditions: true
  })
})

test('should update a users name ', async () => {
  const user = {
    id: 1,
    name: 'Rich Haines',
    email: 'hello@prisma.io'
  }

  prismaMock.user.update.mockResolvedValue(user)

  await expect(updateUsername(user)).resolves.toEqual({
    id: 1,
    name: 'Rich Haines',
    email: 'hello@prisma.io'
  })
})

test('should fail if user does not accept terms', async () => {
  const user = {
    id: 1,
    name: 'Rich Haines',
    email: 'hello@prisma.io',
    acceptTermsAndConditions: false
  }

  prismaMock.user.create.mockRejectedValue(new Error('User must accept terms!'))
})

describe('61834610', () => {
    it('should get all gameplays', async () => {
      const mReq = {};
      const mRes = {};
      const mNext = jest.fn();
      await gameplaysController.getAll(mReq, mRes, mNext);
      expect(mNext).toBeCalledWith(new Error('invalid.'));
    });

    it('should throw 400 error if id is empty string', async () => {
      const mReq = { params: { id: '' } };
      const mRes = {};
      const mNext = jest.fn();
      await retrieveMember(mReq, mRes, mNext);
      expect(mNext).toBeCalledWith(new Error('invalid.'));
    });

    it('should throw 400 error if id is undefined', async () => {
      const mReq = { params: {} };
      const mRes = {};
      const mNext = jest.fn();
      await retrieveMember(mReq, mRes, mNext);
      expect(mNext).toBeCalledWith(new Error('invalid.'));
    });

    it('should throw 400 error if id is invalid format', async () => {
      const mReq = { params: { id: '$$' } };
      const mRes = {};
      const mNext = jest.fn();
      await retrieveMember(mReq, mRes, mNext);
      expect(mNext).toBeCalledWith(new Error('invalid format.'));
    });

    it('should retrieve one member by id and send response correctly', async () => {
      const mMemberRecord = { id: '1', username: 'KF1' };
      jest.spyOn(MemberService, 'retrieveOneMember').mockResolvedValueOnce(mMemberRecord);
      const mReq = { params: { id: '1' } };
      const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const mNext = jest.fn();
      await retrieveMember(mReq, mRes, mNext);
      expect(MemberService.retrieveOneMember).toBeCalledWith('1');
      expect(mRes.status).toBeCalledWith(200);
      expect(mRes.send).toBeCalledWith({ member_detail: { id: '1', username: 'KF1' } });
    });
  }); */
