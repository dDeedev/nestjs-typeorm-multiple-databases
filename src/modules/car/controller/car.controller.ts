import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  Req,
} from '@nestjs/common';
import { Employee } from 'src/models/second_db/emp.entity';
import { Car } from '../../../models/second_db/car.entity';
import { CarService } from '../service/car.service';
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  home(): string {
    return this.carService.home();
  }

  @Get('all')
  findAll(): Promise<Car[]> {
    return this.carService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: number): Promise<Car> {
    return this.carService.getOne(id);
  }

  @Post('add')
  createCar(@Body() car: Car, @Req() emp: Employee) {
    return this.carService.createCar(car, car.emp);
  }

  @Delete(':id')
  remove(@Param() id: number): Promise<Car> {
    return this.carService.remove(id);
  }

  @Put(':id')
  updateCar(@Param() id: number, @Body() car: Car): Promise<Car> {
    return this.carService.updateCar(id, car);
  }
}
