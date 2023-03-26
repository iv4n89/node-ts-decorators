import { Body, Controller, Delete, Get, Params, Post, Put, Res } from "../../Decorators";
import { ResponseBuilder } from "../../Helpers";
import { CountryZone } from "../../Models/Country/CountryZone";
import { CountryZoneService } from "../../Services";


@Controller('country-zone')
export class CountryZoneController {

    private readonly service = CountryZoneService.instance;

    @Get('/')
    public async getAll(@Res() res: ResponseBuilder) {
        const zones = await this.service.getAll();
        return res.Ok().Json(zones).build();
    }

    @Get('/:id')
    public async getOne(@Params('id') id: number, @Res() res: ResponseBuilder) {
        const zone = await this.service.getOne(id);
        return res.Ok().Json(zone).build();
    }

    @Post('/')
    public async create(@Body() countryZone: CountryZone, @Res() res: ResponseBuilder) {
        const zone = await this.service.create(countryZone);
        return res.Created().Json(zone).build();
    }

    @Put('/:id')
    public async update(@Params('id') id: number, @Body() countryZone: CountryZone, @Res() res: ResponseBuilder) {
        const zone = await this.service.update(id, countryZone);
        return res.Ok().Json(zone).build();
    }

    @Delete('/:id')
    public async delete(@Params('id') id: number, @Res() res: ResponseBuilder) {
        await this.service.delete(id);
        return res.NoContent().build();
    }
}