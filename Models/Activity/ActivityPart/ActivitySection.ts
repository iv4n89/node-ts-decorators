import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "../../BaseMode";
import { ActivitySectionType } from "./ActivitySectionType";
import { PossibleResult } from "./PossibleResult";


@Entity({ name: 'activitySections' })
export class ActivitySection extends BaseModel {

    @Column('varchar')
    text: string;

    @ManyToOne(() => ActivitySectionType, type => type.sections)
    type: ActivitySectionType;

    @OneToMany(() => PossibleResult, possibleResult => possibleResult.section)
    possibleResults: PossibleResult[];

}