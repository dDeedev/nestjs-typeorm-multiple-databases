import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Car } from './car.entity';

@Entity({ database: 'nest_second' })
// @Unique(['emp_id'])
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  emp_id: string;

  @Column()
  card_id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  department: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @OneToMany(() => Car, (car: Car) => car.emp)
  car: Car[];
}
