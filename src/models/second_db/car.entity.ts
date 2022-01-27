import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Employee } from './emp.entity';

@Entity({ database: 'nest_second'})
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  license_plate: string;

  @Column()
  qrcode_id: string;

  @Column()
  province: string;

  @Column()
  type: string;

  @Column( "boolean" ,{default: false})
  isCheckIn: boolean = false;

  @Column()
  zone: string;

  @Column()
  bay: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToOne((type) => Employee, (emp) => emp.car)
  emp: Employee;
}
