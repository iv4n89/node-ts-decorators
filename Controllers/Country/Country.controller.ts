import { Body, Controller, Delete, Get, Params, Post, Put, Res } from "../../Decorators";
import { ResponseBuilder } from "../../Helpers";
import { Country } from "../../Models/Country/Country";
import { CountryService } from "../../Services";


@Controller('/country')
export class CountryController {

    private readonly service: CountryService = CountryService.instance;

    constructor() {}

    @Get('/')
    public async getAll(@Res() res: ResponseBuilder) {
        const countries = await this.service.getAll();
        return res.Ok().Json(countries).build();
    }

    @Get('/:id')
    public async getOne(@Params('id') id: number, @Res() res: ResponseBuilder) {
        const country = await this.service.getOne(id);
        return res.Ok().Json(country).build();
    }

    @Post('/')
    public async create(@Body() country: Country, @Res() res: ResponseBuilder) {
        const _country = await this.service.create(country);
        return res.Created().Json(_country).build();
    }

    @Put('/:id')
    public async update(@Params('id') id: number, @Body() country: Partial<Country>, @Res() res: ResponseBuilder) {
        const _country = await this.service.update(id, country);
        return res.Ok().Json(_country).build();
    }

    @Delete('/:id')
    public async delete(@Params('id') id: number, @Res() res: ResponseBuilder) {
        await this.service.delete(id);
        return res.NoContent().build();
    }
}