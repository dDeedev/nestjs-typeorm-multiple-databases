// import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { ConnectionOptions } from 'typeorm'

export const first_db: ConnectionOptions = {
  name: 'default',
  type: 'mongodb',
  host: process.env.DB1_HOST,
  port: parseInt(process.env.DB1_PORT) || 3306,
  username: process.env.DB1_USERNAME,
  password: process.env.DB1_PASSWORD,
  database: process.env.DB1_SCHEMA,
  entities: ['dist/models/first_db/*.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: true,
  logging: false,
  cli: {
    entitiesDir: 'src/models/first_db',
    migrationsDir: 'src/migrations/',
  },
};

export const second_db: ConnectionOptions = {
  name: 'second',
  type: 'mongodb',
  host: process.env.DB2_HOST,
  port: parseInt(process.env.DB2_PORT) || 3306,
  username: process.env.DB2_USERNAME,
  password: process.env.DB2_PASSWORD,
  database: process.env.DB2_SCHEMA,
  entities: ['dist/models/second_db/*.js'],
  migrations: ['dist/migrations/*.js'],
  synchronize: true,
  logging: false,
  cli: {
    entitiesDir: 'src/models/second_db',
    migrationsDir: 'src/migrations/',
  },
};

// module.exports = first_db,second_db ## discommend this line if you want to run migration