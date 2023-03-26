import { Repository } from "typeorm";
import { Logger } from "../../Helpers/Logger";
import { User } from "../../Models/User/User";
import { Server } from "../../Server/Server";


export class UserService {

    private static Instance: UserService;
    private readonly repository: Repository<User>;
    private readonly logger = Logger.Factory();

    private constructor() {
        this.repository = Server.Db.getRepository(User);
    }

    public static get instance() {
        if (!UserService.Instance) {
            UserService.Instance = new UserService();
        }

        return UserService.Instance;
    }

    public async getAll(): Promise<User[]> {
        return await this.repository.find();
    }

    public async getOne(id: number): Promise<User> {

        const user = await this.repository.findOne({ where: { id } })

        if (!user) {
            this.logger.error({
                msg: `User ${ id } not found`,
                class: UserService.name
            });

            throw new Error('User not found');
        }

        return user;
    }

    public async create(user: User) {
        const _user = this.repository.create(user);
        const newUser = await this.repository.save(_user, { reload: true });

        this.logger.info({
            msg: `Created new user`,
            class: UserService.name,
            obj: _user
        });

        return newUser;
    }

    public async update(id: number, user: Partial<User>) {
        const result = await this.repository.createQueryBuilder('u')
                        .update()
                        .set({
                            ...user
                        })
                        .where("id = :id", { id })
                        .execute();

        if (result.affected) {
            this.logger.info({
                msg: `User ${ id } has been updated`,
                class: UserService.name,
                obj: user,
                id
            });

            return await this.getOne(id);
        }

        this.logger.warning({
            msg: 'No user has been updated!'
        });

        return null;
    }

    public async delete(id: number): Promise<void> {
        await this.repository.createQueryBuilder('u')
                .delete()
                .where('id = :id', { id })
                .execute();
    }

}