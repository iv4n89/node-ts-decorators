import { Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "../../BaseMode";
import { ActivitySection } from "./ActivitySection";


@Entity({ name: 'activitySectionTypes' })
export class ActivitySectionType extends BaseModel {

    @Column('varchar')
    name: string;

    @OneToMany(() => ActivitySection, section => section.type)
    sections: ActivitySection[];

}