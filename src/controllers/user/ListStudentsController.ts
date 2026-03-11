import { Request, Response } from 'express'
import { ListStudentsService } from '../../services/user/ListStudentsService'

class ListStudentsController {
    async handle(req: Request, res: Response) {
        const listStudentsService = new ListStudentsService();

        const students = await listStudentsService.execute();

        return res.json(students);
    }
}

export { ListStudentsController }
