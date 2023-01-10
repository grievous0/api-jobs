# API Jobs
## Description
This is a simple API to manage jobs. It is possible to create, update, delete and list jobs, candidates and companies.
Built with Typescript, Express and Sequelize.

## Dependencies
- [Sequelize](https://sequelize.org/)
- [Express](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Postgres](https://www.postgresql.org/)

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/grievous0/api-jobs.git && cd api-jobs
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create a database
```bash
psql postgres
CREATE USER user_name WITH ENCRYPTED PASSWORD 'password' CREATEDB;
```

### 4. Run migrations and seeds
```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### 5. Run the project
```bash
npm run start
```
