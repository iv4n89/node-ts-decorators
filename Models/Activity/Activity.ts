import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Server } from "../../Server/Server";
import { BaseModel } from "../BaseMode";
import { Tag } from "../Tag/Tag";
import { Topic } from "../Topic/Topic";
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

    @ManyToOne(() => Topic, topic => topic.activities)
    topic: Topic;

    @ManyToMany(() => Tag, tag => tag.activities, { nullable: true })
    tags: Tag[];

    public async setTag(id: number | Tag) {
        const tag = await Tag.createOrGetTag(id);
        this.tags = [ ...new Set([ ...this.tags, tag ]) ];
        await Server.Db.getRepository(Activity).save(this);
    }

    public async deleteTag(id: number) {
        this.tags = this.tags.filter(tag => tag.id !== id);
        await Server.Db.getRepository(Activity).save(this);
    }
}