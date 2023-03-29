import { Body, Delete, Get, Params, Post, Put, Res } from "../Decorators";
import { ResponseBuilder } from "../Helpers";
import { BaseModel } from "../Models/BaseMode";
import { BaseService } from "../Services/BaseService.service";


export abstract class BaseController<T extends BaseModel> {

    protected service: BaseService<T>;

    @Get()
    public async getAll(@Res() res: ResponseBuilder) {
        const models = await this.service.getAll();
        return res.Ok().Json(models).build();
    }

    @Get(':id')
    public async getOne(@Params('id') id: number, @Res() res: ResponseBuilder) {
        const model = await this.service.getOne(id);
        return res.Ok().Json(model).build();
    }

    @Post()
    public async create(@Body() attributes: T, @Res() res: ResponseBuilder) {
        const model = await this.service.create(attributes);
        return res.Created().Json(model).build();
    }

    @Put(':id')
    public async update(@Params('id') id: number, @Body() attributes: Partial<T>, @Res() res: ResponseBuilder) {
        const model = await this.service.update(id, attributes);
        return res.Ok().Json(model).build();
    }

    @Delete(':id')
    public async delete(@Params('id') id: number, @Res() res: ResponseBuilder) {
        await this.service.delete(id);
        return res.NoContent().build();
    }

}