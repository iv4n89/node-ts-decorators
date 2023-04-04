import { Repository } from "typeorm";
import { Activity } from "../../Models/Activity/Activity";
import { Tag } from "../../Models/Tag/Tag";
import { Server } from "../../Server/Server";
import { BaseService } from "../BaseService.service";


export class TagService extends BaseService<Tag> {

    private static Instance: TagService;
    protected model: string = Tag.name;
    protected repository: Repository<Tag> = Server.Db.getRepository(Tag);
    protected manyToMany: string[] = [ 'Topic', 'Activity', 'Subject' ];

    public static get instance(): TagService {
        if (!TagService.Instance) {
            TagService.Instance = new TagService();
        }

        return TagService.Instance;
    }

    public async deleteActivity(id: number, activityId: number | number[]): Promise<void> {

        if (Array.isArray(activityId)) {
            activityId.forEach(async (actId) => await (await this.repository.findOneBy({ id })).deleteActivity(actId));
        } else if (typeof activityId === 'number') {
            await (await this.repository.findOneBy({ id })).deleteActivity(activityId);
        }

    }

    public async deleteSubject(id: number, subjectId: number | number[]): Promise<void> {

        if (Array.isArray(subjectId)) {
            subjectId.forEach(async (subId) => await (await this.repository.findOneBy({ id })).deleteSubject(subId));
        } else if (typeof subjectId === 'number') {
            await (await this.repository.findOneBy({ id })).deleteSubject(subjectId);
        }
    
    }

    public async deleteTopic(id: number, topicId: number | number[]): Promise<void> {

        if (Array.isArray(topicId)) {
            topicId.forEach(async (topId) => await (await this.repository.findOneBy({ id })).deleteTopic(topId));
        } else if (typeof topicId === 'number') {
            await (await this.repository.findOneBy({ id })).deleteTopic(topicId);
        }

    }
}