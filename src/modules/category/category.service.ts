import { CustomError } from "../../lib/customError";
import { ResData } from "../../lib/resData";
import { ICategoryCreateDto } from "./dto/create-category.dto";
import { CategoryEntity } from "./entity/CATEGORY.entity";
import { ICategoryRepository } from "./interfaces/category.repository";
import { ICategoryService } from "./interfaces/category.service";
import { categoryRepository } from "./category.repository";

class UserService implements ICategoryService {
  constructor(private readonly userRepository: ICategoryRepository) {}

  async create(dto: ICategoryCreateDto): Promise<ResData<CategoryEntity>> {
    const data = await this.userRepository.create(
      dto.name
    );

    if (!data) {
      throw new CustomError(500, "category not created");
    }

    const resData = new ResData<CategoryEntity>(201, "created", data);

    return resData;
  }
  async findAll(): Promise<ResData<Array<CategoryEntity>>> {
    const data = await this.userRepository.findAll();

    const resData = new ResData<Array<CategoryEntity>>(200, "ok", data);

    return resData;
  }

  async update(dto: ICategoryCreateDto, id: string): Promise<ResData<CategoryEntity>> {
    if (!id) {
      throw new CustomError(400, "ID is required");
    }
  
    const data = await this.userRepository.update(
      id,
      dto.name
    );
  
    if (!data) {
      throw new CustomError(500, "category not updated");
    }
  
    return new ResData<CategoryEntity>(200, "category updated successfully", data);
  }
  
  async delete(id:string):Promise<ResData<CategoryEntity>>{
    if (!id) {
      throw new CustomError(400, "ID is required");
    }
    await this.userRepository.delete(id)
    return new ResData<CategoryEntity>(200, "category delete successfully");
  }
  
  async findById(id: string): Promise<ResData<(CategoryEntity | undefined)[]>> {
    const data = await this.userRepository.findById(id);
    const resData = new ResData<(CategoryEntity | undefined)[]>(200, "ok", [data])
    return resData;
  }
  
}

export const categoryService = new UserService(categoryRepository);
