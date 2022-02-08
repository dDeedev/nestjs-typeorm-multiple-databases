import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../../../models/second_db/emp.entity';
import { getRepository, Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee, 'second')
    private readonly employeeRepository: Repository<Employee>,
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

  async getOnebyEmpId(emp_id: string): Promise<Employee> {
    try {
      const one_employee = await this.employeeRepository.findOne({
        where: { emp_id: emp_id },
      });
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

  async createEmployee(employee: Employee): Promise<Employee> {
    try {
      const emp = await this.getOnebyEmpId(employee.emp_id);
      if (!emp) {
        const new_employee = await this.employeeRepository.create({
          emp_id: employee.emp_id,
          card_id: employee.card_id,
          name: employee.name,
          department: employee.department,
        });
        if (!new_employee) {
          throw new HttpException(`Creating fail`, HttpStatus.NOT_FOUND);
        }

        await this.employeeRepository.save(new_employee);
        return new_employee;
      } else {
        return this.getOnebyEmpId(employee.emp_id);
      }
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
