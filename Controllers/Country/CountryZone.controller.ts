import { Controller} from "../../Decorators";
import { CountryZone } from "../../Models/Country/CountryZone";
import { CountryZoneService } from "../../Services";
import { BaseController } from "../BaseController";


@Controller('country-zone')
export class CountryZoneController extends BaseController<CountryZone> {

    protected readonly service = CountryZoneService.instance;

}