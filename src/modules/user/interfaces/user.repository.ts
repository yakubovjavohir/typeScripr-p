  import { Role } from "../../../common/enums";
  import { ResData } from "../../../lib/resData";
  import { UserEntity } from "../entity/user.entity";

  export interface IUserRepository {
    create(
      email: string,
      fullname: string,
      password: string,
      role: Role
    ): Promise<UserEntity | undefined>;

    findAll(): Promise<Array<UserEntity>>;

    findOneByEmail(email: string): Promise<UserEntity | undefined>;

    update(
      id:string,
      email: string,
      fullname: string,
      password: string,
      role: Role,
    ): Promise<UserEntity | undefined>;

    delete(id: string): Promise<undefined>;

    findById(id:string):Promise<UserEntity | undefined>
  }
