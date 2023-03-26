import { Repository } from "typeorm";
import { Logger } from "../../Helpers";
import { Country } from "../../Models/Country/Country";
import { Server } from "../../Server/Server";


export class CountryService {

    private static Instance: CountryService;
    private readonly repository: Repository<Country>;
    private readonly logger = Logger.Factory();

    private constructor() {
        this.repository = Server.Db.getRepository(Country);
    }

    public static get instance() {
        if (!CountryService.Instance) {
            CountryService.Instance = new CountryService();
        }

        return CountryService.Instance;
    }

    public async getAll(): Promise<Country[]> {
        return await this.repository.find();
    }

    public async getOne(id: number): Promise<Country> {
        const country = await this.repository.findOne({ where: { id }});

        if (!country) {
            this.logger.error({
                msg: `Country ${ id } not found`,
                class: CountryService.name
            });

            throw new Error('Country not found');
        }

        return country;
    }

    public async create(country: Country) {
        const _country = this.repository.create(country);
        const newCountry = await this.repository.save(_country, { reload: true });

        this.logger.info({
            msg: `Created new country`,
            class: CountryService.name,
            obj: _country
        });

        return newCountry;
    }

    public async update(id: number, country: Partial<Country>) {
        const result = await this.repository.createQueryBuilder('c')
                        .update()
                        .set({
                            ...country
                        })
                        .where('id = :id', { id })
                        .execute();

        if (result.affected) {
            this.logger.info({
                msg: `Country ${ id } has been updated`,
                class: CountryService.name,
                obj: country,
                id
            });

            return await this.getOne(id);
        }

        this.logger.warning({
            msg: 'No country has been updated!'
        });

        return null;
    }

    public async delete(id: number): Promise<void> {
        await this.repository.createQueryBuilder('c')
                .delete()
                .where('id = :id', { id })
                .execute();
    }
}