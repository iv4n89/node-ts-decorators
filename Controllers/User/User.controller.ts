import { UserService } from "../../Services/User/User.service";
import { Controller } from "../../Decorators";
import { User } from "../../Models/User/User";
import { BaseController } from "../BaseController";


@Controller('user')
export class UserController extends BaseController<User> {

    protected service: UserService = UserService.instance;

}