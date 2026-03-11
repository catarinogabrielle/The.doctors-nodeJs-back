import { Request, Response } from 'express'
import { CreateClasseService } from '../../services/classe/CreateClasseService'

class CreateClasseController {
    async handle(req: Request, res: Response) {
        const { title, description, myclasse_id, link } = req.body;

        const createMyClasseService = new CreateClasseService();

        const material = req.file ? req.file.filename : null;

        const classe = await createMyClasseService.execute({
            material,
            description,
            myclasse_id,
            title,
            link,
        });

        return res.json(classe);
    }
}

export { CreateClasseController }