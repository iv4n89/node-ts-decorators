import { Repository } from "typeorm";
import { User } from "../../Models/User/User";
import { Server } from "../../Server/Server";
import { BaseService } from "../BaseService.service";


export class UserService extends BaseService<User> {

    private static Instance: UserService;
    protected readonly repository: Repository<User> = Server.Db.getRepository(User);
    protected model: string = User.name;
    protected manyToMany: string[] = [];

    public static get instance() {
        if (!UserService.Instance) {
            UserService.Instance = new UserService();
        }

        return UserService.Instance;
    }

}