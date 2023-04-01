import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "../../BaseMode";
import { Activity } from "../Activity";
import { ActivitySection } from "./ActivitySection";


@Entity({ name: 'activityParts' })
export class ActivityPart extends BaseModel {

    @ManyToOne(() => Activity, activity => activity.parts)
    activity: Activity;

    @OneToMany(() => ActivitySection, section => section.activityPart, { eager: true })
    sections: ActivitySection[];

}