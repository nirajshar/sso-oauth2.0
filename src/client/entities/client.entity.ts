import { ApplicationEntity } from 'src/application/entities/application.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

enum STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TEMPORARY_BLOCKED = 'TEMPORARY BLOCKED',
  PERMANENT_BLOCKED = 'PERMANENT BLOCKED',
}

@Entity({ name: 'clients' })
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column({ type: 'varchar', nullable: false })
  actual_name: string;

  @Column({ type: 'varchar', nullable: false })
  display_name: string;

  @Column({ type: 'text', nullable: false })
  address: string;

  @Column({ type: 'text', nullable: false })
  pincode: string;

  @Column({ type: 'text', nullable: false })
  city: string;

  @Column({ type: 'varchar', nullable: false })
  state: string;

  @Column({ type: 'varchar', nullable: false })
  country: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  contact: string;

  @ManyToOne((type) => ApplicationEntity, (application) => application.id)
  @JoinColumn({ name: 'application_id' })
  application: ApplicationEntity;

  @Column('enum', {
    enum: STATUS,
    default: STATUS[STATUS.INACTIVE],
  })
  status: string;

  //   @Column()
  //   created_by: string; // Has to be Realtion with USER ID

  //   @Column()
  //   updated_by: string; // Has to be Realtion with USER ID

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
