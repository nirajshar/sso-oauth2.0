import { Max } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

enum STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TEMPORARY_BLOCKED = 'TEMPORARY BLOCKED',
  PERMANENT_BLOCKED = 'PERMANENT BLOCKED',
}

@Entity({ name: 'applications' })
export class ApplicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  @Max(50)
  application_key: string;

  @Column({ type: 'text', nullable: false })
  application_secret: string;

  @Column({ type: 'text', nullable: false })
  allowed_url: string;

  @Column({ type: 'text', nullable: false })
  redirect_url: string;

  @Column('enum', {
    enum: STATUS,
    default: STATUS[STATUS.INACTIVE],
  })
  status: string;

  //   @Column()
  //   created_by: string; // Has to be Realtion with USER ID

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
