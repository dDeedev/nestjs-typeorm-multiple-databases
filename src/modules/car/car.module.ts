import { Module } from '@nestjs/common';
import { CarService } from './service/car.service';
import { CarController } from './controller/car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from '../../models/second_db/car.entity';
import { Employee } from 'src/models/second_db/emp.entity';
import { EmployeeService } from '../employee/service/emp.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car],'second'),TypeOrmModule.forFeature([Employee],'second' )
    // TypeOrmModule.forFeature([Car], 'second'),
  ],
  // providers: [CarService],
   providers: [CarService, EmployeeService],
  controllers: [CarController],
  exports: [CarService],
})
export class CarModule {}
