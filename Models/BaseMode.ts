import { CreateDateColumn, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";


export abstract class BaseModel {

    @PrimaryGeneratedColumn({ unsigned: true, type: "bigint" })
    id!: number;

    @CreateDateColumn()
    createDate!: Timestamp;

    @UpdateDateColumn()
    updateDate!: Timestamp;

}