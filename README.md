# JS-challenge

## How to start

### Docker
- Start `startWithDocker.bat`

### Manual
- Rename `.env.sample` -> `.env`
- Run prisma setup: `npx prisma migrate reset --force`

- To start project use `npm start`
- To start nodeamon use `npm run dev`
- To run tests use `npm test`

## Possible problems when running code:

- Pirsma isn't installed globaly: `npm i -g prisma`
- Prisma client isn't installed globaly: `npm i -g @prisma/client`