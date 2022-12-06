import { Request, Response } from 'express'
import { FindClasseService } from '../../services/mycourse/FindClasseService'

class FindClasseController {
    async handle(req: Request, res: Response) {
        const { title } = req.query;
        console.log(typeof title);
        console.log('aqui')
        

        const findClasseService = new FindClasseService();

        const myclasse = await findClasseService.execute('teste');

        return res.json(myclasse);

    }
}

export { FindClasseController }