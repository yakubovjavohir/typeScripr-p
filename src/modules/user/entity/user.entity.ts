import { Role } from "../../../common/enums";
import { ID } from "../../../common/types";

export class UserEntity {
  id!: ID;
  role!: Role;
  email!: string;
  password!: string;
  fullname!: string;
}
