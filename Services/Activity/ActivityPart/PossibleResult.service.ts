import { Repository } from "typeorm";
import { PossibleResult } from "../../../Models/Activity/ActivityPart/PossibleResult";
import { Server } from "../../../Server/Server";
import { BaseService } from "../../BaseService.service";



export class PossibleResultService extends BaseService<PossibleResult> {

    private static Instance: PossibleResultService;
    protected repository: Repository<PossibleResult> = Server.Db.getRepository(PossibleResult);
    protected model: string = PossibleResult.name;
    protected manyToMany: string[] = [];

    public static get instance() {
        if (!PossibleResultService.Instance) {
            PossibleResultService.Instance = new PossibleResultService();
        }

        return PossibleResultService.Instance;
    }

}