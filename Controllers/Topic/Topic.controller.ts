import { Controller } from "../../Decorators";
import { Topic } from "../../Models/Topic/Topic";
import { TopicService } from "../../Services";
import { BaseService } from "../../Services/BaseService.service";
import { BaseController } from "../BaseController";


@Controller('topic')
export class TopicController extends BaseController<Topic> {

    protected service: BaseService<Topic> = TopicService.instance;

}