import { CustomError } from "../../lib/customError";
import { ResData } from "../../lib/resData";
import { IAuthCreateDto } from "./dto/auth.dto";
import { AuthEntity } from "./entity/auth.entity";
import { userService } from "../user/user.service";
import { jwtInstance } from "../../lib/token";
import { userRepository } from "../user/user.repository";
import { IAuthService } from "./interfaces/auth.service";
import { IUserRepository } from "../user/interfaces/user.repository";
import { UserEntity } from "../user/entity/user.entity";
class AuthService implements IAuthService{
  constructor(private readonly userRepository: IUserRepository) {}

  async login(dto: IAuthCreateDto): Promise<ResData<AuthEntity>> {
    const data = await this.userRepository.findOneByEmail(dto.email)
    
    const accToken = jwtInstance.generateAccToken(data)
    const refToken = jwtInstance.generateRefToken(data)


    const token:AuthEntity = {
        token:{
          accToken,
          refToken
        }
    }

    const resData = new ResData<AuthEntity>(201, "created token", token);

    return resData;
  }
}

export const authService = new AuthService(userRepository);
