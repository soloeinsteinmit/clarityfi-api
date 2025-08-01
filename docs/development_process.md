# Development process: everything i did in setting up and building this project

## 1. Initializing project with node.js and typescript

- Npm docs- https://docs.npmjs.com/creating-a-package-json-file
- typescript docs: https://www.typescriptlang.org/download/
- How i step node with typescript tutorial, this one helped me setup Express JS as well: https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript
  - how to install node on other os -https://www.digitalocean.com/community/tutorial-series/how-to-install-node-js-and-create-a-local-development-environment
  - use `npx tsc --init` to generate `tsconfig.json` file
  - official typescript cli compiler options docs - https://www.typescriptlang.org/docs/handbook/compiler-options.html
- express.js docs - https://expressjs.com/
- npm scripts docs(how to use the scripts in package.json) - https://docs.npmjs.com/cli/v8/using-npm/scripts

## 2. setting up prisma & connecting to local db

what prisma is video by fireship: https://www.youtube.com/watch?v=rLRIB6AF2Dg

- https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql
- https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-node-postgresql
- connection prisma to db - https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgresql
- prisma client, client side component allowing me to communicate with my database - https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/install-prisma-client-typescript-postgresql
- prisma command to test if your schema is valid `npx prisma validate`
- Prisma connection resources docs

  - prisma database drivers documentation - https://www.prisma.io/docs/orm/overview/databases/database-drivers
  - drivers implementation for postgres - https://www.prisma.io/docs/orm/overview/databases/postgresql

- checking if your postgres server is running on your pc `sc query postgresql-x64-17`

## 3. Creating models

- official docs for creating models: https://www.prisma.io/docs/orm/prisma-schema/data-model/models

## 4. Prisma Quaries docs

- https://www.prisma.io/docs/orm/prisma-client/queries/crud

## 5. Restarting your node server authomatically with nodemon

- https://www.digitalocean.com/community/tutorials/workflow-nodemon
- https://www.npmjs.com/package/nodemon
