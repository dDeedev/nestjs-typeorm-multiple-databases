import {
  Get,
  Post,
  Body,
  Req,
  Put,
  Delete,
  Param,
  Controller,
} from '@nestjs/common';
import { Employee } from '../../../models/second_db/emp.entity';
import { EmployeeService } from '../service/emp.service';

@Controller('emp')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  home(): string {
    return this.employeeService.home();
  }

  @Get('all')
  findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: number): Promise<Employee> {
    return this.employeeService.getOne(id);
  }

  @Get()
  getByEmpId(@Body() employee: Employee): Promise<Employee> {
    return this.employeeService.getOnebyEmpId(employee.emp_id);
  }

  @Post('add')
  createEmployee(@Body() employee: Employee) {
    return this.employeeService.createEmployee(employee);
  }

  @Delete(':id')
  remove(@Param() id: number): Promise<Employee> {
    return this.employeeService.remove(id);
  }

  @Put(':id')
  updateEmployee(
    @Param() id: number,
    @Body() employee: Employee,
  ): Promise<Employee> {
    return this.employeeService.updateEmployee(id, employee);
  }
}
