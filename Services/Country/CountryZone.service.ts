import { Repository } from "typeorm";
import { Logger } from "../../Helpers";
import { CountryZone } from "../../Models/Country/CountryZone";
import { Server } from "../../Server/Server";


export class CountryZoneService {
    private static Instance: CountryZoneService;
    private readonly repository: Repository<CountryZone>;
    private readonly logger = Logger.Factory();

    private constructor() {
        this.repository = Server.Db.getRepository(CountryZone);
    }

    public static get instance() {
        if (!CountryZoneService.Instance) {
            CountryZoneService.Instance = new CountryZoneService();
        }

        return CountryZoneService.Instance;
    }

    public async getAll(): Promise<CountryZone[]> {
        return await this.repository.find();
    }

    public async getOne(id: number): Promise<CountryZone> {
        const zone = await this.repository.findOne({ where: { id } });

        if (!zone) {
            this.logger.error({
                msg: `Country zone ${ id } not found`,
                class: CountryZoneService.name
            });

            throw new Error('Country zone not found');
        }

        return zone;
    }

    public async create(countryZone: CountryZone): Promise<CountryZone> {
        const zone = this.repository.create(countryZone);
        const newZone = await this.repository.save(zone);

        this.logger.info({
            msg: `Created new country zone`,
            class: CountryZoneService.name,
            obj: newZone
        });

        return newZone;
    }

    public async update(id: number, countryZone: Partial<CountryZone>): Promise<CountryZone> {
        const result = await this.repository.createQueryBuilder('cZ')
                        .update()
                        .set({
                            ...countryZone
                        })
                        .where('id = :id', { id })
                        .execute();

        if (result.affected) {
            this.logger.info({
                msg: `Country zone ${ id } has been updated!`,
                class: CountryZone.name,
                obj: countryZone,
                id
            });

            return await this.getOne(id);
        }

        this.logger.warning({
            msg: 'No country zone have been updated',
        });

        return null;
    }

    public async delete(id: number): Promise<void> {
        await this.repository.createQueryBuilder('cZ')
                .delete()
                .where('id = :id', { id })
                .execute();
    }
}