import { BaseRepository } from "../../lib/baseRepository";
import { CategoryEntity } from "./entity/CATEGORY.entity";
import { ICategoryRepository } from "./interfaces/category.repository";


class CategoryRepository extends BaseRepository implements ICategoryRepository {
  async create(
    name:string
  ): Promise<CategoryEntity | undefined> {
    return await this.single<CategoryEntity, any>(
      `INSERT INTO category (name) VALUES ($1) RETURNING *`,
      name
    );
  }

  async findAll(): Promise<Array<CategoryEntity>> {
    return await this.multiple<CategoryEntity, any>(`SELECT * FROM category`);
  }

  async update(
    id: string,
    name:string
  ): Promise<CategoryEntity | undefined> {    
    return await this.single<CategoryEntity, any>(
      `UPDATE category SET name = $1 WHERE id = $2 RETURNING *`,
      name,
      id
    );
  }
  
  
  
  

  async delete(id: string): Promise<undefined> {
    await this.single(`DELETE FROM category WHERE id = $1`, id);
    return undefined;
  }

 
  
    async findById(id: string): Promise<CategoryEntity | undefined> {
      return await this.single<CategoryEntity, string>(
        `SELECT * FROM category WHERE id = $1`,
        id
      );
    }
  
  
}


export const categoryRepository = new CategoryRepository();

