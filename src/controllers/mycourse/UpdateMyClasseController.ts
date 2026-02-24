import { Request, Response } from 'express'
import { UpdateMyClasseService } from '../../services/mycourse/UpdateMyClasseService'

class UpdateMyClasseController {
    async handle(req: Request, res: Response) {
        const {
            myclasse_id,
            title,
            teachername,
            teacherinfo,
            teacherwork,
            description,
            time,
            link,
            paymentlink,
        } = req.body;

        const updateMyClasseService = new UpdateMyClasseService();

        const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
        const image = files?.image?.[0]?.filename;
        const teacherphoto = files?.teacherphoto?.[0]?.filename;

        const myclasse = await updateMyClasseService.execute({
            myclasse_id,
            title,
            image,
            teacherphoto,
            teacherwork,
            teachername,
            teacherinfo,
            description,
            time,
            link,
            paymentlink,
        });

        return res.json(myclasse);
    }
}

export { UpdateMyClasseController }
