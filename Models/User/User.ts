import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import { AuthService } from "../../Services/Auth/AuthService.service";
import { BaseModel } from "../BaseMode";


@Entity({ name: 'users', synchronize: true })
export class User extends BaseModel {

    @Column('varchar')
    name!: string;

    @Column('varchar')
    lastName!: string;

    @Column('varchar', { unique: true })
    email!: string;

    @Column('varchar', { select: false })
    password!: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await AuthService.instance.hashPassword(this.password);
        }
    }

}