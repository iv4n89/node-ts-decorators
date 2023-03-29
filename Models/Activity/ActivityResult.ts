import { Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "../BaseMode";
import { User } from "../User/User";
import { Activity } from "./Activity";


@Entity({ name: 'activityResults' })
export class ActivityResult extends BaseModel {

    @OneToMany(() => User, user => user.activityResults)
    user: User;

    @OneToMany(() => Activity, activity => activity.activityResults)
    activity: Activity;

    @Column('float')
    punctuation: number;

}