import { forwardRef, Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '../../../models/second_db/car.entity';
import { Repository } from 'typeorm';

export  interface CarInterface {
    id: number;
    license_plate: string;
    qrcode_id: string;
    province: string;
    type: string;
    isCheckIn: boolean;
    zone: string;
    bay: string;
}

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car,'second')
    private carRepository: Repository<Car>,
  ) {}

  async findAll(): Promise<Car[]> {
    try {
        const all_car = await this.carRepository.find();
        return all_car;
    } catch (err) {
        return err;
    }
  }

  async findOne(id: string): Promise<Car> {
    try {
      const one_car = await this.carRepository.findOne(id);
      if (!one_car) {
        throw new HttpException(`No data`, HttpStatus.NOT_FOUND);
      }
      return one_car;
    } catch (err) {
      throw err;
    }
  }

  async remove(id: string): Promise<Car> {
    try {
        const car = await this.findOne(id);
        if (!car) {
          throw new HttpException(`No data`, HttpStatus.NOT_FOUND);
        }
        return this.carRepository.remove(car);
    } catch (err) {
      throw err;
    }
  }

  async createCar(car: CarInterface): Promise<Car>{
    try {
        const new_car =  this.carRepository.create({
                license_plate : car.license_plate,
                qrcode_id : car.qrcode_id,
                province : car.province,
                type : car.type,
                isCheckIn : car.isCheckIn,
                zone : car.zone,
                bay : car.bay
        })
        if (!new_car) {
          throw new HttpException(`Creating fail`, HttpStatus.NOT_FOUND);
        }
        return this.carRepository.save(new_car);
    } catch (err) {
      throw err;
    }
  }

  async updateCar(id: string, car: CarInterface): Promise<Car> {
    try {
        const car_id = await this.findOne(id);
        if (!car_id) {
          throw new HttpException(`No data`, HttpStatus.NOT_FOUND);
        }else{
                this.carRepository.merge(car_id,{
                license_plate : car.license_plate,
                qrcode_id : car.qrcode_id,
                province : car.province,
                type : car.type,
                isCheckIn : car.isCheckIn,
                zone : car.zone,
                bay : car.bay
            })
            return this.carRepository.save(car_id);
        }
    } catch (err) {
      throw err;
    }
  }

  home(): string {
    return 'this is cars home page';
  }
}
