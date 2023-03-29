import { Controller } from "../../../Decorators";
import { ActivitySectionType } from "../../../Models/Activity/ActivityPart/ActivitySectionType";
import { ActivitySectionTypeService } from "../../../Services/Activity/ActivityPart/ActivitySectionType.service";
import { BaseService } from "../../../Services/BaseService.service";
import { BaseController } from "../../BaseController";


@Controller('activity-section-type')
export class ActivitySectionTypeController extends BaseController<ActivitySectionType> {

    protected service: BaseService<ActivitySectionType> = ActivitySectionTypeService.instance;

}