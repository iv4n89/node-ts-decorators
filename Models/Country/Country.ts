import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import { BaseModel } from "../BaseMode";
import { CountryFlag } from "./CountryFlag";
import { CountryZone } from "./CountryZone";


@Entity({ name: 'countries' })
export class Country extends BaseModel {

    @Column('varchar')
    name: string;

    @Column('varchar')
    countryCode: string;

    @Column('varchar')
    isoCode: string;

    @Column('varchar')
    timeZone: string;

    @ManyToOne(() => CountryZone, zone => zone.countries, { eager: true })
    countryZone: CountryZone;

    @OneToOne(() => CountryFlag, flag => flag.country, { eager: true })
    flag: CountryFlag;
}