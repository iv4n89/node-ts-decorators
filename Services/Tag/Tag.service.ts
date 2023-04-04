import { Repository } from "typeorm";
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
}