import { Controller } from "../../Decorators";
import { Tag } from "../../Models/Tag/Tag";
import { TagService } from "../../Services";
import { BaseService } from "../../Services/BaseService.service";
import { BaseController } from "../BaseController";


@Controller('tag')
export class TagController extends BaseController<Tag> {

    protected service: BaseService<Tag> = TagService.instance;

}