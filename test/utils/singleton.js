const { mockDeep, mockReset } = require('jest-mock-extended');

const prisma = require('../../src/utils/client');
const prismaMock = prisma;

jest.mock('../../src/utils/client', () => mockDeep());

beforeEach(() => {
  mockReset(prismaMock);
});

module.exports = { prismaMock };
