import { Column, Entity, OneToOne } from "typeorm";
import { BaseModel } from "../BaseMode";
import { Country } from "./Country";


@Entity({ name: 'countryFlags' })
export class CountryFlag extends BaseModel {

    @Column('varchar')
    name: string;

    @Column('varchar', { nullable: true })
    image?: string;

    @OneToOne(() => Country, country => country.flag)
    country: Country;
}