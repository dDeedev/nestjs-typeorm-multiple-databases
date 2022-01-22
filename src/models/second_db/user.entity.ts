import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ database: 'nest_second' })
@Unique(['username'])
export class User2 {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  role!: string;

  @Column()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: number;

  @Column()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: number;
}
