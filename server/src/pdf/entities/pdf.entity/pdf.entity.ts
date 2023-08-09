import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PdfEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column('bytea', { nullable: true }) // Adjust the type if necessary
  buffer: Buffer;
}