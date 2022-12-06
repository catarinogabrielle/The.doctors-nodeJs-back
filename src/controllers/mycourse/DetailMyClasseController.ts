import { Request, Response } from 'express'
import { DetailMyClasseService } from '../../services/mycourse/DetailMyClasseService'

class DetailMyClasseController {
    async handle(req: Request, res: Response) {
        const myclasse_id = req.query.myclasse_id as string;

        const detailMyClasseService = new DetailMyClasseService();

        const myclasse = await detailMyClasseService.execute({
            myclasse_id
        })

        return res.json(myclasse);

    }
}

export { DetailMyClasseController }