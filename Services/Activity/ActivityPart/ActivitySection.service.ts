import { Repository } from "typeorm";
import { ActivitySection } from "../../../Models/Activity/ActivityPart/ActivitySection";
import { Server } from "../../../Server/Server";
import { BaseService } from "../../BaseService.service";
import { PossibleResultService } from "./PossibleResult.service";



export class ActivitySectionService extends BaseService<ActivitySection> {

    private static Instance: ActivitySectionService;
    protected repository: Repository<ActivitySection> = Server.Db.getRepository(ActivitySection);
    protected model: string = ActivitySectionService.name;
    protected manyToMany: string[] = [];

    public static get instance() {
        if (!ActivitySectionService.Instance) {
            ActivitySectionService.Instance = new ActivitySectionService();
        }

        return ActivitySectionService.Instance;
    }

    public async create(attributes: ActivitySection): Promise<ActivitySection> {
        const entity = this.repository.create(attributes);
        if (!!attributes.possibleResults) {
            const resultRepo = PossibleResultService.instance;
            const results = [];
            for (const result of attributes.possibleResults) {
                const newResult = await resultRepo.create(result);
                results.push(newResult.id);
            }
            entity.possibleResults = results;
        }

        return await this.repository.save(entity);
    }

}