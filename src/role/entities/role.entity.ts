import { ApplicationEntity } from 'src/application/entities/application.entity';
import { PermissionEntity } from 'src/permission/entities/permission.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

@Entity({ name: 'roles' })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

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

  @ManyToOne((type) => ApplicationEntity, (application) => application.id)
  @JoinColumn({ name: 'application_id' })
  application: ApplicationEntity;

  @ManyToMany((type) => PermissionEntity, { cascade: true })
  @JoinTable({
    name: 'role_owns_permission',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  owns: PermissionEntity[];
}
