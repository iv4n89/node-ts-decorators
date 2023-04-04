import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Server } from "../../Server/Server";
import { Activity } from "../Activity/Activity";
import { BaseModel } from "../BaseMode";
import { Subject } from "../Subject/Subject";
import { Topic } from "../Topic/Topic";


@Entity({ name: 'topics' })
export class Tag extends BaseModel {

    @Column('varchar')
    name: string;

    @ManyToMany(() => Activity, activity => activity.tags, { createForeignKeyConstraints: true, nullable: true })
    @JoinTable()
    activities: Activity[];

    @ManyToMany(() => Topic, topic => topic.tags, { nullable: true, createForeignKeyConstraints: true })
    @JoinTable()
    topics: Topic[];

    @ManyToMany(() => Subject, subject => subject.tags, { nullable: true, createForeignKeyConstraints: true })
    @JoinTable()
    subjects: Subject[];

    public static async createOrGetTag(attributes: number | Tag): Promise<Tag> {
        const tagRepo = Server.Db.getRepository(Tag);
        let tag: Tag;

        if (typeof attributes === 'number') {
            tag = await tagRepo.findOneBy({ id: attributes });
        } else if ('id' in attributes && 'name' in attributes) {
            const _tag = tagRepo.create(attributes);
            tag = await tagRepo.save(_tag);
        }

        return tag;
    }

    public async setActivity(id: number) {
        const activityRepo = Server.Db.getRepository(Activity);
        const activity = await activityRepo.findOneBy({ id });
        this.activities = [...new Set([...this.activities, activity])];
        await Server.Db.getRepository(Tag).save(this);
    }

    public async setTopic(id: number) {
        const topicRepo = Server.Db.getRepository(Topic);
        const topic = await topicRepo.findOneBy({ id });
        this.topics = [...new Set([...this.topics, topic])];
        await Server.Db.getRepository(Tag).save(this);
    }

    public async setSubject(id: number) {
        const subjectRepo = Server.Db.getRepository(Subject);
        const subject = await subjectRepo.findOneBy({ id });
        this.subjects = [...new Set([...this.subjects, subject])];
        await Server.Db.getRepository(Tag).save(this);
    }

    public async deleteActivity(id: number) {
        this.activities = this.activities.filter(activity => activity.id !== id);
        await Server.Db.getRepository(Tag).save(this);
    }

    public async deleteTopic(id: number) {
        this.topics = this.topics.filter(topic => topic.id !== id);
        await Server.Db.getRepository(Tag).save(this);
    }

    public async deleteSubject(id: number) {
        this.subjects = this.subjects.filter(subject => subject.id !== id);
        await Server.Db.getRepository(Tag).save(this);
    }

}