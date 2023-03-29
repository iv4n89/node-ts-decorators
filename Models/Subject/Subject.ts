import { Column, Entity } from "typeorm";
import { BaseModel } from "../BaseMode";


@Entity({ name: 'subjects' })
export class Subject extends BaseModel {

    @Column('varchar')
    name: string;

    @Column('varchar', { nullable: true })
    image: string;

    @Column('varchar', { nullable: true })
    description: string;

    
}