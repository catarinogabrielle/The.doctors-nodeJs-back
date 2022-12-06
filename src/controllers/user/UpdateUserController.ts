import { Request, Response } from 'express'
import { UpdateUserService } from '../../services/user/UpdateUserService'

class UpdateUserController {
    async handle(req: Request, res: Response) {
        const { courseId, userId } = req.body;

        const updateUserService = new UpdateUserService();

        const newUser = await updateUserService.execute({ courseId, userId });

        return res.json(newUser);

    }
}

export { UpdateUserController }