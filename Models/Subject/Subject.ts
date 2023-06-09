import { Column, Entity, ManyToMany } from "typeorm";
import { Server } from "../../Server/Server";
import { BaseModel } from "../BaseMode";
import { Tag } from "../Tag/Tag";


@Entity({ name: 'subjects' })
export class Subject extends BaseModel {

    @Column('varchar')
    name: string;

    @Column('varchar', { nullable: true })
    image: string;

    @Column('varchar', { nullable: true })
    description: string;

    @ManyToMany(() => Tag, tag => tag.subjects)
    tags: Tag[];

    public async setTag(id: number | Tag) {
        const tag = await Tag.createOrGetTag(id);
        this.tags = [...new Set([...this.tags, tag])];
        await Server.Db.getRepository(Subject).save(this);
    }

    public async deleteTag(id: number) {
        this.tags = this.tags.filter(tag => tag.id !== id);
        await Server.Db.getRepository(Subject).save(this);
    }
    
}