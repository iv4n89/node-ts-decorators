import { UserService } from "../../Services/User/User.service";
import { Body, Controller, Delete, Get, Jwt, Params, Post, Put, Res } from "../../Decorators";
import { User } from "../../Models/User/User";
import { ResponseBuilder } from "../../Helpers/ResponseBuilder";
import { Validation } from "../../Decorators/validate.decorator";


@Controller('/user')
export class UserController {

    private static Instance: UserController;
    private readonly service: UserService = UserService.instance;

    constructor() {}

    public static get instance() {
        if (!UserController.Instance) {
            UserController.Instance = new UserController();
        }

        return UserController.Instance;
    }

    @Get('/')
    public async getAll(@Res() res: ResponseBuilder) {
        const users = await this.service.getAll();
        return res.Ok().Json(users).build();
    }

    @Jwt()
    @Get('/:id')
    public async getOne(@Params('id') id: number, @Res() res: ResponseBuilder) {
        const user = await this.service.getOne(id);
        return res.Ok().Json(user).build();
    }

    @Validation<User>({
        name: {
            not: {
                contains: { value: 'hola', message: 'NO debe contener hola' }
            }
        }
    })
    @Post('/')
    public async create(@Body() user: User, @Res() res: ResponseBuilder) {
        const _user = await this.service.create(user);
        return res.Created().Json(_user).build();
    }

    @Validation<User>({
        name: {
            not: {
                contains: 'hoa'
            }
        }
    })
    @Put('/:id')
    public async update(@Params('id') id: number, @Body() user: Partial<User>, @Res() res: ResponseBuilder) {
        const _user = await this.service.update(id, user);
        return res.Ok().Json(_user).build();
    }

    @Delete('/:id')
    public async delete(@Params('id') id: number, @Res() res: ResponseBuilder) {
        await this.service.delete(id);
        return res.NoContent().build();
    }
}