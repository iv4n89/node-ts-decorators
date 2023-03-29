import { Repository } from "typeorm";
import { ActivityType } from "../../Models/Activity/ActivityType";
import { Server } from "../../Server/Server";
import { BaseService } from "../BaseService.service";


export class ActivityTypeService extends BaseService<ActivityType> {

    private static Instance: ActivityTypeService;
    protected repository: Repository<ActivityType> = Server.Db.getRepository(ActivityType);
    protected model: string = ActivityType.name;
    protected manyToMany: string[] = [];

    public static get instance(): ActivityTypeService {
        if (!ActivityTypeService.Instance) {
            ActivityTypeService.Instance = new ActivityTypeService();
        }

        return ActivityTypeService.Instance;
    }

}