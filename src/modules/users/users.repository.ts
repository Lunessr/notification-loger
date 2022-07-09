import { UserSchema } from "../../collections/users";
import { User, UserWithoutId } from "../../interfaces/user";

class UsersRepository {
  async createUser(user: UserWithoutId): Promise<any> {
    const createdUsers = await UserSchema.insertMany([user]);
    return createdUsers[0];
  }
  async getUserByPhone(phone: User["phone"]): Promise<User> {
    return await UserSchema.findOne({
      phone: phone,
    });
  }
}

const usersRepository = new UsersRepository();
export { usersRepository };
