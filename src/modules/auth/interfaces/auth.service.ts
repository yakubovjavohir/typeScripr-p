import { ResData } from "../../../lib/resData";
import { IAuthCreateDto } from "../dto/auth.dto";
import { AuthEntity } from "../entity/auth.entity";

export interface IAuthService {
  login(dto: IAuthCreateDto): Promise<ResData<AuthEntity>>;
}
 