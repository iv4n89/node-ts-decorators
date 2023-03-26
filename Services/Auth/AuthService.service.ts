import { Repository } from "typeorm";
import { User } from "../../Models/User/User";
import { Server } from "../../Server/Server";
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';


export class AuthService {
    private static Instance: AuthService;
    private readonly repository: Repository<User> = Server.Db.getRepository(User);

    constructor() {}

    public static get instance(): AuthService {
        if (!AuthService.Instance) {
            AuthService.Instance = new AuthService();
        }

        return AuthService.Instance;
    }

    public async verifyPassword(email: string, password: string) {
        const user = await this.repository.findOneBy({ email });
        if (!user) throw new Error('Invalid credentials');
        const { password: user_password } = await Server.Db.createQueryBuilder()
                            .select()
                            .addSelect('user.password')
                            .from(User, 'user')
                            .where('email = :email', { email })
                            .getOne() as User;
        const validatePassword = bcrypt.compareSync(password, user_password);
        if (!validatePassword) throw new Error('Invalid credentials');
        const token = await this.generateJwt(user.id);
        return { user, token };
    }

    public generateJwt(id: number) {
        return new Promise((resolve, reject) => {
            const payload = { id };
            jwt.sign(payload, process.env.SECRET!, {
                expiresIn: '72h',
            }, (err, token) => {
                if (err) {
                    console.log(err);
                    reject('Not possible to generate token');
                } else {
                    resolve(token);
                }
            });
        });
    }

    public hashPassword(password: string) {
        const salt = 10;
        const hashedPass = bcrypt.hash(password, salt);

        return hashedPass;
    }
}