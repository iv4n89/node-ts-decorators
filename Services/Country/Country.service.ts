import { Repository } from "typeorm";
import { Country } from "../../Models/Country/Country";
import { Server } from "../../Server/Server";
import { BaseService } from "../BaseService.service";


export class CountryService extends BaseService<Country> {

    private static Instance: CountryService;
    protected repository: Repository<Country> = Server.Db.getRepository(Country);
    protected model: string = Country.name;
    protected manyToMany: string[] = [];

    public static get instance() {
        if (!CountryService.Instance) {
            CountryService.Instance = new CountryService();
        }

        return CountryService.Instance;
    }
}