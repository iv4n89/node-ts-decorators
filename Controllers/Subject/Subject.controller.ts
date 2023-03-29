import { Controller } from "../../Decorators";
import { Subject } from "../../Models/Subject/Subject";
import { BaseService } from "../../Services/BaseService.service";
import { SubjectService } from "../../Services/Subject/Subject.service";
import { BaseController } from "../BaseController";


@Controller('subject')
export class SubjectController extends BaseController<Subject> {

    protected service: BaseService<Subject> = SubjectService.instance;

}