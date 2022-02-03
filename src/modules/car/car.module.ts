import { Module } from '@nestjs/common';
import { CarService } from './service/car.service';
import { CarController } from './controller/car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from '../../models/second_db/car.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Car],'second'),TypeOrmModule.forFeature([Employee],'default' )
    TypeOrmModule.forFeature([Car], 'second'),
  ],
  providers: [CarService],
  controllers: [CarController],
  exports: [CarService],
})
export class CarModule {}
