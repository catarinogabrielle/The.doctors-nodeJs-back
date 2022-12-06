import { Request, Response } from "express";
import { FindClasseService } from "../../services/mycourse/FindClasseService";

class FindClasseController {
  async handle(req: Request, res: Response) {
    const { title } = req.query;

    const findClasseService = new FindClasseService();

    const myclasse = await findClasseService.execute(title);

    return res.json(myclasse);
  }
}

export { FindClasseController };
