import {
    Get,
    Post,
    Body,
    Put,
    Delete,
    Param,
    Controller,
  } from '@nestjs/common';
  import { Car } from '../../../models/second_db/car.entity';
  import { CarService } from '../service/car.service';
  import { CarInterface } from '../service/car.service';
  
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
    findOne(@Param()id: string): Promise<Car> {
      return this.carService.findOne(id);
    }
  
    @Post('add')
    createCar(@Body()car: CarInterface): Promise<Car> {
      return this.carService.createCar(car);
    }
  
    @Delete(':id')
    remove(@Param()id: string): Promise<Car> {
      return this.carService.remove(id);
    }
  
    @Put(':id')
    updateCar(@Param()id: string, @Body()car: CarInterface): Promise<Car> {
      return this.carService.updateCar(id, car);
    }
  }
  