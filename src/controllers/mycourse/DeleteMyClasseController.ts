import { Request, Response } from 'express'
import { DeleteMyClasseService } from '../../services/mycourse/DeleteMyClasseService'

class DeleteMyClasseController {
    async handle(req: Request, res: Response) {
        const myclasse_id = req.query.myclasse_id as string;
        const user_id = req.user_id;

        const deleteMyClasseService = new DeleteMyClasseService();

        const myclasse = await deleteMyClasseService.execute({
            myclasse_id,
            user_id
        })

        return res.json(myclasse);

    }
}

export { DeleteMyClasseController }
