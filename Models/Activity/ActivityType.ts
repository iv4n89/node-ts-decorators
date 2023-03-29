import { Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "../BaseMode";
import { Activity } from "./Activity";


@Entity({ name: 'activityTypes' })
export class ActivityType extends BaseModel {

    @Column('varchar')
    name: string;

    @OneToMany(() => Activity, activity => activity.type)
    activities: Activity[];

}
