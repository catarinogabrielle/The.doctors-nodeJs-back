import { Request, Response } from 'express'
import { ListPublicMyClasseService } from '../../services/mycourse/ListPublicMyClasseService'

class ListPublicMyClasseController {
    async handle(req: Request, res: Response) {
        const listPublicMyClasseService = new ListPublicMyClasseService();

        const courses = await listPublicMyClasseService.execute();

        return res.json(courses);
    }
}

export { ListPublicMyClasseController }
