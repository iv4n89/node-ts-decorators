import { Controller } from "../../Decorators";
import { ActivityType } from "../../Models/Activity/ActivityType";
import { ActivityTypeService } from "../../Services/Activity/ActivityType.service";
import { BaseService } from "../../Services/BaseService.service";
import { BaseController } from "../BaseController";


@Controller('activity-type')
export class ActivityTypeController extends BaseController<ActivityType> {

    protected service: BaseService<ActivityType> = ActivityTypeService.instance;

}