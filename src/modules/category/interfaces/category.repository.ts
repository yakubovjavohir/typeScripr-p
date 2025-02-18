  import { CategoryEntity } from "../entity/CATEGORY.entity";

  export interface ICategoryRepository {
    create(
      name:string
    ): Promise<CategoryEntity | undefined>;

    findAll(): Promise<Array<CategoryEntity>>;

    update(
      id:string,
      name:string
    ): Promise<CategoryEntity | undefined>;

    delete(id: string): Promise<undefined>;

        findById(id:string):Promise<CategoryEntity | undefined>
    
}
