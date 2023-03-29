import { Controller } from "../../../Decorators";
import { ActivityPart } from "../../../Models/Activity/ActivityPart/ActivityPart";
import { ActivityPartService } from "../../../Services/Activity/ActivityPart/ActivityPart.service";
import { BaseService } from "../../../Services/BaseService.service";
import { BaseController } from "../../BaseController";



@Controller('activity-part')
export class ActivityPartController extends BaseController<ActivityPart> {

    protected service: BaseService<ActivityPart> = ActivityPartService.instance;

}