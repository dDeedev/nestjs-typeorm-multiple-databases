import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../../../models/second_db/emp.entity';
import { getRepository, Repository } from 'typeorm';
import { Car } from 'src/models/second_db/car.entity';
import { CarService } from 'src/modules/car/service/car.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee, 'second')
    private readonly employeeRepository: Repository<Employee>,
    private carService: CarService,
  ) {}

  async findAll(): Promise<Employee[]> {
    try {
      const all_employee = await this.employeeRepository.find();
      return all_employee;
    } catch (err) {
      return err;
    }
  }

  async getOne(id: number): Promise<Employee> {
    try {
      const one_employee = await this.employeeRepository.findOneOrFail(id);
      if (!one_employee) {
        throw new HttpException(`No data`, HttpStatus.NOT_FOUND);
      }
      return one_employee;
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number): Promise<Employee> {
    try {
      const employee = await this.getOne(id);
      if (!employee) {
        throw new HttpException(`No data`, HttpStatus.NOT_FOUND);
      }
      return this.employeeRepository.remove(employee);
    } catch (err) {
      throw err;
    }
  }

  async createEmployee(employee: Employee, car: Car) {
    try {
      const new_employee = await this.employeeRepository.create({
        emp_id: employee.emp_id,
        card_id: employee.card_id,
        name: employee.name,
        department: employee.department,
        car: employee.car,
      });
      if (!new_employee) {
        throw new HttpException(`Creating fail`, HttpStatus.NOT_FOUND);
      }
      const new_car = await this.carService.createCar(car);
      await this.employeeRepository.save(new_employee);
      return new_employee;
    } catch (err) {
      throw err;
    }
  }

  async updateEmployee(id: number, employee: Employee): Promise<Employee> {
    try {
      const employee_id = await this.getOne(id);
      if (!employee_id) {
        throw new HttpException(`No data`, HttpStatus.NOT_FOUND);
      } else {
        this.employeeRepository.merge(employee_id, {
          emp_id: employee.emp_id,
          card_id: employee.card_id,
          name: employee.name,
          department: employee.department,
          car: employee.car,
        });
        return this.employeeRepository.save(employee_id);
      }
    } catch (err) {
      throw err;
    }
  }

  home(): string {
    return 'this is employees home page';
  }
}
