import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { Server } from "../../Server/Server";
import { Activity } from "../Activity/Activity";
import { BaseModel } from "../BaseMode";
import { Tag } from "../Tag/Tag";


@Entity({ name: 'topics' })
export class Topic extends BaseModel {

    @Column('varchar')
    name: string;

    @OneToMany(() => Activity, activity => activity.topic)
    activities: Activity[];

    @ManyToMany(() => Tag, tag => tag.topics)
    tags: Tag[];

    public async setTag(id: number | Tag) {
        const tag = await Tag.createOrGetTag(id);
        this.tags = [...new Set([...this.tags, tag])];
        await Server.Db.getRepository(Topic).save(this);
    }

    public async deleteTag(id: number) {
        this.tags = this.tags.filter(tag => tag.id !== id);
        await Server.Db.getRepository(Topic).save(this);
    }

}