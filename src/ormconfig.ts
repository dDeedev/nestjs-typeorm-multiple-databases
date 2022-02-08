// import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { ConnectionOptions } from 'typeorm'

export const first_db: ConnectionOptions = {
  name: 'default',
  type: 'mysql',
  host: 'localhost',
  port: 3309,
  username: 'root',
  password: '',
  database: 'nest_first',
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
  type: 'mysql',
  host: 'localhost',
  port: 3309,
  username: 'root',
  password: '',
  database: 'nest_second',
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