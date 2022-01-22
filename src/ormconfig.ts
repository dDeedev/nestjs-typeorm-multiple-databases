import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
// import { User } from './models/first_db/user.entity';
// import { User2 } from './models/second_db/user.entity';

export const first_db: MysqlConnectionOptions = {
  name: 'default',
  type: 'mysql',
  host: 'localhost',
  port: 3309,
  username: 'root',
  password: '',
  database: 'nest_first',
  entities: ['dist/src/models/first_db/*.js'],
  migrations: ['dist/migration/**/*.js'],
  synchronize: true,
  logging: false,
  cli: {
    entitiesDir: 'src/models/first_db',
    migrationsDir: 'src/migration',
  },
};

export const second_db: MysqlConnectionOptions = {
  name: 'second',
  type: 'mysql',
  host: 'localhost',
  port: 3309,
  username: 'root',
  password: '',
  database: 'nest_second',
  entities: ['dist/src/models/second_db/*.js'],
  migrations: ['dist/migration/**/*.js'],
  logging: true,
  synchronize: true,
  cli: {
    entitiesDir: 'src/models/second_db',
    migrationsDir: 'src/migration',
  },
  extra: {
    trustServerCertificate: true,
  },
};
