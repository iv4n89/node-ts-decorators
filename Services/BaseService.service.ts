import { Repository } from "typeorm";
import { Logger } from "../Helpers";
import { BaseModel } from "../Models/BaseMode";


export abstract class BaseService<T extends BaseModel> {

    protected repository: Repository<T>;
    protected logger = Logger.Factory();
    protected model: string;
    protected manyToMany: string[] = [];

    public static get instance() {
        return null;
    }

    protected constructor() {}

    public async getAll(): Promise<T[]> {
        return await this.repository.find();
    }

    public async getOne(id: number): Promise<T> {
        return await this.repository.findOne({ where: { id: <any>id }, loadEagerRelations: true })
    }

    public async create(attributes: T): Promise<T> {
        const entity = this.repository.create(attributes);
        const newEntity = await this.repository.save(entity);

        this.logger.debug({
            msg: `Created new element of type ${ this.model }`
        });

        this.syncManyToManyRelationships(newEntity, attributes);

        return await this.getOne(newEntity.id);
    }

    public async update(id: number, attributes: Partial<T>): Promise<T> {
        const model = await this.getOne(id);
        this.syncManyToManyRelationships(model, attributes);
        Object.keys(attributes).forEach((key) => {
            model[key] = attributes[key];
        });
        return await this.repository.save(model);
    }

    public async delete(id: number): Promise<void> {
        await this.repository.createQueryBuilder('c')
                    .delete()
                    .where('id = :id', { id })
                    .execute();
    }



    protected syncManyToManyRelationships(model: T, attributes: Partial<T>) {
        for (const relation of this.manyToMany) {
            if (attributes[relation] && typeof model[`set${relation}`] === 'function') {
                model[`set${ relation }`](attributes);
                delete attributes[relation];
            }
        }
    }
}