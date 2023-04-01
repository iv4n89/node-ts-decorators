import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from "typeorm";
import { AuthService } from "../../Services/Auth/AuthService.service";
import { ActivityResult } from "../Activity/ActivityResult";
import { BaseModel } from "../BaseMode";


@Entity({ name: 'users', synchronize: true })
export class User extends BaseModel {

    @Column('varchar')
    name!: string;

    @Column('varchar')
    lastName!: string;

    @Column('varchar')
    username: string;

    @Column('varchar', { unique: true })
    email!: string;

    @Column('varchar', { select: false })
    password!: string;

    @Column('varchar', { nullable: true })
    avatar: string;

    @Column('varchar', { nullable: true })
    remember_token: string;

    @OneToMany(() => ActivityResult, activityResult => activityResult.user)
    activityResults: ActivityResult[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await AuthService.instance.hashPassword(this.password);
        }
    }

}