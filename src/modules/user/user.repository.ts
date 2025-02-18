import { Role } from "../../common/enums";
import { BaseRepository } from "../../lib/baseRepository";
import { UserEntity } from "./entity/user.entity";
import { IUserRepository } from "./interfaces/user.repository";


class UserRepository extends BaseRepository implements IUserRepository {
  async create(
    email: string,
    fullname: string,
    password: string,
    role: Role
  ): Promise<UserEntity | undefined> {
    return await this.single<UserEntity, any>(
      `INSERT INTO users (email, fullname, password, role) VALUES ($1, $2, $3, $4) RETURNING *`,
      email,
      fullname,
      password,
      role
    );
  }

  async findAll(): Promise<Array<UserEntity>> {
    return await this.multiple<UserEntity, any>(`SELECT * FROM users`);
  }

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.single<UserEntity, string>(
      `SELECT * FROM users WHERE email = $1`,
      email
    );
  }

  async update(
    id: string,
    email: string,
    fullname: string,
    password: string,
    role: Role,
  ): Promise<UserEntity | undefined> {    
    return await this.single<UserEntity, any>(
      `UPDATE users SET email = $1, fullname = $2, password = $3, role = $4 WHERE id = $5 RETURNING *`,
      email,
      fullname,
      password,
      role,
      id
    );
  }
  
  
  
  

  async delete(id: string): Promise<undefined> {
    await this.single(`DELETE FROM users WHERE id = $1`, id);
    return undefined;
  }

 
  
    async findById(id: string): Promise<UserEntity | undefined> {
      return await this.single<UserEntity, string>(
        `SELECT * FROM users WHERE id = $1`,
        id
      );
    }
  
  
}


export const userRepository = new UserRepository();

