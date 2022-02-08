import { Module } from '@nestjs/common';
import { EmployeeService } from './service/emp.service';
import { EmployeeController } from './controller/emp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../../models/second_db/emp.entity';
import { Car } from 'src/models/second_db/car.entity';
import { CarService } from '../car/service/car.service';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Employee],'second'),TypeOrmModule.forFeature([Employee],'second' )
    TypeOrmModule.forFeature([Employee], 'second'),
  ],
  // providers: [EmployeeService, CarService],
  providers: [EmployeeService],
  controllers: [EmployeeController],
  exports: [EmployeeService],
})
export class EmployeeModule {}
