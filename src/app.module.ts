// /* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './controllers/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { first_db, second_db } from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(first_db), TypeOrmModule.forRoot(second_db)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
