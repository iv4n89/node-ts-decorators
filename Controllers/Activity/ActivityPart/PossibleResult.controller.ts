import { Controller } from "../../../Decorators";
import { PossibleResult } from "../../../Models/Activity/ActivityPart/PossibleResult";
import { PossibleResultService } from "../../../Services/Activity/ActivityPart/PossibleResult.service";
import { BaseService } from "../../../Services/BaseService.service";
import { BaseController } from "../../BaseController";



@Controller('possible-result')
export class PossibleResultController extends BaseController<PossibleResult> {

    protected service: BaseService<PossibleResult> = PossibleResultService.instance;

}