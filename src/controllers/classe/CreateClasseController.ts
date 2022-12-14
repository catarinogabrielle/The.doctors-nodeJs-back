import { Request, Response } from 'express'
import { CreateClasseService } from '../../services/classe/CreateClasseService'

class CreateClasseController {
    async handle(req: Request, res: Response) {
        const { title, description, myclasse_id, link } = req.body;

        const createMyClasseService = new CreateClasseService();

        if (!req.file) {
            throw new Error("error upload file")
        } else {

            const { filename: material } = req.file

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
}

export { CreateClasseController }