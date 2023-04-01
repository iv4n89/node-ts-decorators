import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "../../BaseMode";
import { ActivityPart } from "./ActivityPart";
import { ActivitySectionType } from "./ActivitySectionType";
import { PossibleResult } from "./PossibleResult";


@Entity({ name: 'activitySections' })
export class ActivitySection extends BaseModel {

    @Column('varchar')
    text: string;

    @ManyToOne(() => ActivityPart, part => part.sections)
    activityPart: ActivityPart;

    @ManyToOne(() => ActivitySectionType, type => type.sections, { eager: true })
    type: ActivitySectionType;

    @OneToMany(() => PossibleResult, possibleResult => possibleResult.section, { eager: true })
    possibleResults: PossibleResult[];

}