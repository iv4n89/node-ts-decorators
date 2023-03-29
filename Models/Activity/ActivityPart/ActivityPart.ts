import { Column, Entity, ManyToOne } from "typeorm";
import { BaseModel } from "../../BaseMode";
import { Activity } from "../Activity";


@Entity({ name: 'activityParts' })
export class ActivityPart extends BaseModel {

    @ManyToOne(() => Activity, activity => activity.parts)
    activity: Activity;

}