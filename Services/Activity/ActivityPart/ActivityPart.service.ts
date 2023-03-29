import { Repository } from "typeorm";
import { ActivityPart } from "../../../Models/Activity/ActivityPart/ActivityPart";
import { Server } from "../../../Server/Server";
import { BaseService } from "../../BaseService.service";



export class ActivityPartService extends BaseService<ActivityPart> {

    private static Instance: ActivityPartService;
    protected repository: Repository<ActivityPart> = Server.Db.getRepository(ActivityPart);
    protected model: string = ActivityPart.name;
    protected manyToMany: string[] = []; 

    public static get instance() {
        if (!ActivityPartService.Instance) {
            ActivityPartService.Instance = new ActivityPartService();
        }

        return ActivityPartService.Instance;
    }

}