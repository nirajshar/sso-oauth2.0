import { Max } from 'class-validator';
import { ClientEntity } from 'src/client/entities/client.entity';
import { RoleEntity } from 'src/role/entities/role.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

enum STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TEMPORARY_BLOCKED = 'TEMPORARY BLOCKED',
  PERMANENT_BLOCKED = 'PERMANENT BLOCKED',
}

enum AUTHENTICATION_TYPE {
  JWT = 'JWT',
  OAUTH2 = 'OAUTH2',  
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
  
  @Column('enum', {
    enum: AUTHENTICATION_TYPE,
    default: AUTHENTICATION_TYPE[AUTHENTICATION_TYPE.OAUTH2],
  })
  authentication_type: string;

  @Column({ type: 'tinyint', nullable: false })
  max_request_attempts: Number;

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

  @OneToMany(type => ClientEntity, client => client.id)
  client: ClientEntity[];

  @BeforeInsert() async sanitizeKey() {
    this.application_key = await this.application_key
      .replace(/\s/g, '')
      .toLowerCase();
  }

  @OneToMany(type => RoleEntity, role => role.id)
  role: RoleEntity[];
}
