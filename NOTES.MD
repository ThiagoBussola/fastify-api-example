npx -p typescript tsc --init

dependencies
npm i @prisma/client fastify fastify-zod zod zod-to-json-schema fastify-jwt fastify-swagger

devDependencies
npm i ts-node-dev typescript @types/node --dev

Initialise prisma
npx prisma init --datasource-provider postgresql

Não vai usar - NMigrate the schema
npx prisma migrate dev --name init


VAI USAR - npx prisma generate
