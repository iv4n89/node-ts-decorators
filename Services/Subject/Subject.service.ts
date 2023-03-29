import { Repository } from "typeorm";
import { Subject } from "../../Models/Subject/Subject";
import { Server } from "../../Server/Server";
import { BaseService } from "../BaseService.service";


export class SubjectService extends BaseService<Subject> {

    private static Instance: SubjectService;
    protected repository: Repository<Subject> = Server.Db.getRepository(Subject);
    protected model: string = Subject.name;
    protected manyToMany: string[] = [];

    public static get instance(): SubjectService {
        if (!SubjectService.Instance) {
            SubjectService.Instance = new SubjectService();
        }

        return SubjectService.Instance;
    }

}