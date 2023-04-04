import { Repository } from "typeorm";
import { Topic } from "../../Models/Topic/Topic";
import { Server } from "../../Server/Server";
import { BaseService } from "../BaseService.service";


export class TopicService extends BaseService<Topic> {

    private static Instance: TopicService;
    protected model: string = Topic.name;
    protected repository: Repository<Topic> = Server.Db.getRepository(Topic);
    protected manyToMany: string[] = [ 'Topic' ];

    public static get instance(): TopicService {
        if (!TopicService.Instance) {
            TopicService.Instance = new TopicService();
        }

        return TopicService.Instance;
    }

}