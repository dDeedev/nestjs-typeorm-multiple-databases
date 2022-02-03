import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '../../../models/second_db/car.entity';
import { Repository } from 'typeorm';
import { EmployeeService } from 'src/modules/employee/service/emp.service';
import { Employee } from 'src/models/second_db/emp.entity';


@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car,'second')
    private readonly carRepository: Repository<Car>,
    // private empService: EmployeeService
  ) {}

  async findAll(): Promise<Car[]> {
    try {
        const all_car = await this.carRepository.find();
        return all_car;
    } catch (err) {
        return err;
    }
  }

  async getOne(id: number): Promise<Car> {
    try {
      const one_car = await this.carRepository.findOneOrFail(id);
      if (!one_car) {
        throw new HttpException(`No data`, HttpStatus.NOT_FOUND);
      }
      return one_car;
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number): Promise<Car> {
    try {
        const car = await this.getOne(id);
        if (!car) {
          throw new HttpException(`No data`, HttpStatus.NOT_FOUND);
        }
        return this.carRepository.remove(car);
    } catch (err) {
      throw err;
    }
  }

  async createCar(car: Car):Promise<Car>{
    try {
        const new_car =  await this.carRepository.create({
                license_plate : car.license_plate,
                qrcode_id : car.qrcode_id,
                province : car.province,
                type : car.type,
                isCheckIn : car.isCheckIn,
                zone : car.zone,
                bay : car.bay,
        })
        if (!new_car) {
          throw new HttpException(`Creating fail`, HttpStatus.NOT_FOUND);
        }
        // await this.empService.createEmployee(ca)
        await this.carRepository.save(new_car);
        return new_car
    } catch (err) {
      throw err;
    }
  }

  async updateCar(id: number, car: Car): Promise<Car> {
    try {
        const car_id = await this.getOne(id);
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
