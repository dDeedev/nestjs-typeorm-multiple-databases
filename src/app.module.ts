import { Module,  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule} from '@nestjs/typeorm';

import { first_db, second_db } from './ormconfig';
import { UserModule } from './modules/user/user.module';
import { CarModule } from './modules/car/car.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(first_db),
    TypeOrmModule.forRoot(second_db),
    UserModule, CarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
