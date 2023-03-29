import { Repository } from "typeorm";
import { ActivitySectionType } from "../../../Models/Activity/ActivityPart/ActivitySectionType";
import { Server } from "../../../Server/Server";
import { BaseService } from "../../BaseService.service";



export class ActivitySectionTypeService extends BaseService<ActivitySectionType> {

    private static Instance: ActivitySectionTypeService;
    protected repository: Repository<ActivitySectionType> = Server.Db.getRepository(ActivitySectionType);
    protected model: string = ActivitySectionType.name;
    protected manyToMany: string[] = [];

    public static get instance() {
        if (!ActivitySectionTypeService.Instance) {
            ActivitySectionTypeService.Instance = new ActivitySectionTypeService();
        }

        return ActivitySectionTypeService.Instance;
    }

}