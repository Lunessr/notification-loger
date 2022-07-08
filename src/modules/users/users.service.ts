import { UserWithoutId } from "../interfaces/user";
import { usersRepository } from "./users.repository";

class UsersService {
  async createUser(user: UserWithoutId): Promise<any> {
    const existingUser = await usersRepository.getUserByPhone(user.phone);
    if (existingUser !== null) {
      throw new Error("User already exist");
    }
    return usersRepository.createUser(user);
  }
}
const usersService = new UsersService();
export { usersService };
