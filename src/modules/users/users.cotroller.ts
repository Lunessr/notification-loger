import { usersService } from "./users.service";

class UsersController {
  async createUser(req, res): Promise<any> {
    const { name, phone } = req.body;
    try {
      const createdUser = await usersService.createUser({ name, phone });
      return createdUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}
const usersController = new UsersController();
export { usersController };
