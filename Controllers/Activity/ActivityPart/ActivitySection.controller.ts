import { Controller } from "../../../Decorators";
import { ActivitySection } from "../../../Models/Activity/ActivityPart/ActivitySection";
import { ActivitySectionService } from "../../../Services/Activity/ActivityPart/ActivitySection.service";
import { BaseService } from "../../../Services/BaseService.service";
import { BaseController } from "../../BaseController";



@Controller('activity-section')
export class ActivitySectionController extends BaseController<ActivitySection> {

    protected service: BaseService<ActivitySection> = ActivitySectionService.instance;

}