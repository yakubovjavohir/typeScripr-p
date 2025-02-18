import { ResData } from "../../../lib/resData";
import { ICategoryCreateDto } from "../dto/create-category.dto";
import { ICategoryUpdateDto } from "../dto/update-category.dto";
import { CategoryEntity } from "../entity/CATEGORY.entity";

export interface ICategoryService {
  create(dto: ICategoryCreateDto): Promise<ResData<CategoryEntity>>;
  findAll(): Promise<ResData<Array<CategoryEntity>>>;
  update(dto: ICategoryUpdateDto, id:string): Promise<ResData<CategoryEntity>>;
  delete(id:string):Promise<ResData<CategoryEntity>>;
  findById(id:string):Promise<ResData<Array<CategoryEntity | undefined>>>
}
