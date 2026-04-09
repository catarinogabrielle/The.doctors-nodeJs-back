import { Request, Response } from 'express'
import { ListPublicCoursesByTeacherService } from '../../services/mycourse/ListPublicCoursesByTeacherService'

class ListPublicCoursesByTeacherController {
    async handle(req: Request, res: Response) {
        const teacher_id = req.params.teacher_id as string;

        if (!teacher_id) {
            return res.status(400).json({ error: "ID do professor é obrigatório" });
        }

        const listPublicCoursesByTeacherService = new ListPublicCoursesByTeacherService();

        try {
            const courses = await listPublicCoursesByTeacherService.execute({ teacher_id });
            return res.json(courses);
        } catch (err) {
            return res.status(404).json({ error: "Professor não encontrado" });
        }
    }
}

export { ListPublicCoursesByTeacherController }
