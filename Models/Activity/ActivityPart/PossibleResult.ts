import { Column, Entity, ManyToOne } from "typeorm";
import { BaseModel } from "../../BaseMode";
import { ActivitySection } from "./ActivitySection";


@Entity({ name: 'possibleResults' })
export class PossibleResult extends BaseModel {

    @Column('varchar')
    result: string;

    @Column('int', { default: 0 })
    isCorrect: number;

    @ManyToOne(() => ActivitySection, section => section.possibleResults)
    section: ActivitySection;

}