import { Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "../BaseMode";
import { Country } from "./Country";


@Entity({ name: 'contryZones' })
export class CountryZone extends BaseModel {

    @Column('int')
    zoneNumber: number;

    @Column('varchar')
    name: string;

    @OneToMany(() => Country, country => country.countryZone)
    countries: Country[];
}