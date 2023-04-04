import { Controller, Delete, Params, Res } from "../../Decorators";
import { ResponseBuilder } from "../../Helpers";
import { Tag } from "../../Models/Tag/Tag";
import { TagService } from "../../Services";
import { BaseService } from "../../Services/BaseService.service";
import { BaseController } from "../BaseController";


@Controller('tag')
export class TagController extends BaseController<Tag> {

    protected service: BaseService<Tag> & TagService = TagService.instance;

    @Delete('activity/:id/:activityId')
    public async deleteActivity(@Params('id') id: number, @Params('activityId') activityId: number, @Res() res: ResponseBuilder) {
        await this.service.deleteActivity(id, activityId);
        return res.NoContent().build();
    }

    @Delete('subject/:id/:subjectId')
    public async deleteSubject(@Params('id') id: number, @Params('subjectId') subjectId: number, @Res() res: ResponseBuilder) {
        await this.service.deleteSubject(id, subjectId);
        return res.NoContent().build();
    }

    @Delete('topic/:id/:topicId')
    public async deleteTopic(@Params('id') id: number, @Params('topicId') topicId: number, @Res() res: ResponseBuilder) {
        await this.service.deleteTopic(id, topicId);
        return res.NoContent().build();
    }

}