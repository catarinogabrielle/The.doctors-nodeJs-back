import { Request, Response } from 'express'
import { DeleteClasseService } from '../../services/classe/DeleteClasseService'

class DeleteClasseController {
    async handle(req: Request, res: Response) {
        const classe_id = req.query.classe_id as string;

        const deleteClasseService = new DeleteClasseService();

        const classe = await deleteClasseService.execute({
            classe_id
        });

        return res.json(classe);
    }
}

export { DeleteClasseController }
