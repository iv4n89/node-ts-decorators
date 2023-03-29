import { Repository } from "typeorm";
import { Logger } from "../../Helpers";
import { CountryZone } from "../../Models/Country/CountryZone";
import { Server } from "../../Server/Server";
import { BaseService } from "../BaseService.service";


export class CountryZoneService extends BaseService<CountryZone> {

    private static Instance: CountryZoneService;
    protected repository: Repository<CountryZone> = Server.Db.getRepository(CountryZone);
    protected model: string = CountryZone.name;
    protected manyToMany: string[] = [];

    public static get instance() {
        if (!CountryZoneService.Instance) {
            CountryZoneService.Instance = new CountryZoneService();
        }

        return CountryZoneService.Instance;
    }
}