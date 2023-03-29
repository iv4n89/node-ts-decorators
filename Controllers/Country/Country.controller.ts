import { Controller } from "../../Decorators";
import { Country } from "../../Models/Country/Country";
import { CountryService } from "../../Services";
import { BaseController } from "../BaseController";


@Controller('country')
export class CountryController extends BaseController<Country> {

    protected readonly service: CountryService = CountryService.instance;

}