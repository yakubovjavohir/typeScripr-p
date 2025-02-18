import { ResData } from "../../../lib/resData";
import { IUserCreateDto } from "../dto/create-user.dto";
import { IUserUpdateDto } from "../dto/update-user.dto";
import { UserEntity } from "../entity/user.entity";

export interface IUserService {
  create(dto: IUserCreateDto): Promise<ResData<UserEntity>>;
  findAll(): Promise<ResData<Array<UserEntity>>>;
  isExistEmail(email: string): Promise<void>;
  update(dto: IUserUpdateDto, id:string): Promise<ResData<UserEntity>>;
  delete(id:string):Promise<ResData<UserEntity>>;
  findById(id:string):Promise<ResData<Array<UserEntity | undefined>>>
}
