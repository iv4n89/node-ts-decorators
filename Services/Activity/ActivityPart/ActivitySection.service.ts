import { Repository } from "typeorm";
import { ActivitySection } from "../../../Models/Activity/ActivityPart/ActivitySection";
import { Server } from "../../../Server/Server";
import { BaseService } from "../../BaseService.service";



export class ActivitySectionService extends BaseService<ActivitySection> {

    private static Instance: ActivitySectionService;
    protected repository: Repository<ActivitySection> = Server.Db.getRepository(ActivitySection);
    protected model: string = ActivitySectionService.name;
    protected manyToMany: string[] = [];

    public static get instance() {
        if (!ActivitySectionService.Instance) {
            ActivitySectionService.Instance = new ActivitySectionService();
        }

        return ActivitySectionService.Instance;
    }

}