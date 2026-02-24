import { Request, Response } from 'express'
import { UpdateClasseService } from '../../services/classe/UpdateClasseService'

class UpdateClasseController {
    async handle(req: Request, res: Response) {
        const { classe_id, title, description, link, status, draft } = req.body;

        const updateClasseService = new UpdateClasseService();

        const parsedStatus = status === undefined ? undefined : status === true || status === 'true';
        const parsedDraft = draft === undefined ? undefined : draft === true || draft === 'true';

        const material = req.file ? req.file.filename : undefined;

        const classe = await updateClasseService.execute({
            classe_id,
            title,
            description,
            link,
            status: parsedStatus,
            draft: parsedDraft,
            material,
        });

        return res.json(classe);
    }
}

export { UpdateClasseController }
