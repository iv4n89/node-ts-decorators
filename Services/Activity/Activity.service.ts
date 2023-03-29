import { Repository } from "typeorm";
import { Activity } from "../../Models/Activity/Activity";
import { Server } from "../../Server/Server";
import { BaseService } from "../BaseService.service";


export class ActivityService extends BaseService<Activity> {

    private static Instance: ActivityService;
    protected repository: Repository<Activity> = Server.Db.getRepository(Activity);
    protected model: string = Activity.name;
    protected manyToMany: string[] = [];
    
    public static get instance(): ActivityService {
        if (!ActivityService.Instance) {
            ActivityService.Instance = new ActivityService();
        }

        return ActivityService.Instance;
    }

}