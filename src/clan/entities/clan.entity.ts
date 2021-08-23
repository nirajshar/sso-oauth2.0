import { ClientEntity } from 'src/client/entities/client.entity';
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

enum CLAN_TYPE {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
}

@Entity({ name: 'clans' })
export class ClanEntity {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false, default: 0 })
  count: Number;

  @Column('enum', {
    enum: CLAN_TYPE,
    default: CLAN_TYPE[CLAN_TYPE.EXTERNAL],
  })
  type: string;

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

  @ManyToOne((type) => ClientEntity, (client) => client.id)
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;
}
