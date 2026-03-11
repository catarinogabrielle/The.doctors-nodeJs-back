import { Request, Response } from 'express'
import { CreateTeacherService } from '../../services/user/CreateTeacherService'

class CreateTeacherController {
    async handle(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const createTeacherService = new CreateTeacherService();

        const teacher = await createTeacherService.execute({
            name,
            email,
            password
        });

        return res.json(teacher);
    }
}

export { CreateTeacherController }
