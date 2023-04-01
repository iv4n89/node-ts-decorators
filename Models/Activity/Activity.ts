import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "../BaseMode";
import { ActivityPart } from "./ActivityPart/ActivityPart";
import { ActivityResult } from "./ActivityResult";
import { ActivityType } from "./ActivityType";


@Entity({ name: 'activities' })
export class Activity extends BaseModel {

    @Column('varchar')
    name: string;

    @Column('varchar')
    title: string;

    @Column('varchar', { nullable: true })
    description: string;

    @ManyToOne(() => ActivityType, type => type.activities, { eager: true })
    type: ActivityType;

    @OneToMany(() => ActivityPart, part => part.activity, { eager: true })
    parts: ActivityPart[];

    @OneToMany(() => ActivityResult, activityResult => activityResult.activity)
    activityResults: ActivityResult[];
}