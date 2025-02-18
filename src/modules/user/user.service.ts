import { CustomError } from "../../lib/customError";
import { ResData } from "../../lib/resData";
import { IUserCreateDto } from "./dto/create-user.dto";
import { UserEntity } from "./entity/user.entity";
import { IUserRepository } from "./interfaces/user.repository";
import { IUserService } from "./interfaces/user.service";
import { userRepository } from "./user.repository";

class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}
  async isExistEmail(email: string): Promise<void> {
    const data = await this.userRepository.findOneByEmail(email);

    if (data) {
      throw new CustomError(400, "Email already exist");
    }
  }

  async create(dto: IUserCreateDto): Promise<ResData<UserEntity>> {
    const data = await this.userRepository.create(
      dto.email,
      dto.fullname,
      dto.password,
      dto.role
    );

    if (!data) {
      throw new CustomError(500, "User not created");
    }

    const resData = new ResData<UserEntity>(201, "created", data);

    return resData;
  }
  async findAll(): Promise<ResData<Array<UserEntity>>> {
    const data = await this.userRepository.findAll();

    const resData = new ResData<Array<UserEntity>>(200, "ok", data);

    return resData;
  }

  async update(dto: IUserCreateDto, id: string): Promise<ResData<UserEntity>> {
    if (!id) {
      throw new CustomError(400, "ID is required");
    }
  
    const data = await this.userRepository.update(
      id,
      dto.email,
      dto.fullname,
      dto.password,
      dto.role,
    );
  
    if (!data) {
      throw new CustomError(500, "User not updated");
    }
  
    return new ResData<UserEntity>(200, "User updated successfully", data);
  }
  
  async delete(id:string):Promise<ResData<UserEntity>>{
    if (!id) {
      throw new CustomError(400, "ID is required");
    }
    await this.userRepository.delete(id)
    return new ResData<UserEntity>(200, "User delete successfully");
  }
  
  async findById(id: string): Promise<ResData<(UserEntity | undefined)[]>> {
    const data = await this.userRepository.findById(id);
    const resData = new ResData<(UserEntity | undefined)[]>(200, "ok", [data])
    return resData;
  }
  
}

export const userService = new UserService(userRepository);
