import { Request, Response } from 'express'
import { ReorderClassesService } from '../../services/classe/ReorderClassesService'

class ReorderClassesController {
    async handle(req: Request, res: Response) {
        const { myclasse_id, ordered_class_ids } = req.body

        const reorderClassesService = new ReorderClassesService()

        const classes = await reorderClassesService.execute({
            myclasse_id,
            ordered_class_ids,
        })

        return res.json(classes)
    }
}

export { ReorderClassesController }
