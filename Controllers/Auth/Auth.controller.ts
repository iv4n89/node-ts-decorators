
import { Body, Controller, Post, Res } from "../../Decorators";
import { AuthService } from "../../Services/Auth/AuthService.service";
import { UserService } from "../../Services";
import { ResponseBuilder } from "../../Helpers/ResponseBuilder";

@Controller('auth')
export class AuthController {

    @Post('login')
    public async login(@Body('email') email: string, @Body('password') password: string, @Res() res: ResponseBuilder) {
        const { token, user } = await AuthService.instance.verifyPassword(email, password);
        return res.Ok().Json({
            token,
            user
        })
        .build();
    }

    @Post('register')
    public async register(@Body() body: any, @Res() res: ResponseBuilder) {
        const user = await UserService.instance.create(body);
        if (!user) throw new Error('User have not been created');

        const token = await AuthService.instance.generateJwt(user.id);
        return res.Ok().Json({
            token,
            user
        })
        .build();
    }
}