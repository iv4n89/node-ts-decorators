import { Controller } from "../../Decorators";
import { Activity } from "../../Models/Activity/Activity";
import { ActivityService } from "../../Services/Activity/Activity.service";
import { BaseService } from "../../Services/BaseService.service";
import { BaseController } from "../BaseController";


@Controller('activity')
export class ActivityController extends BaseController<Activity> {

    protected service: BaseService<Activity> = ActivityService.instance;

}