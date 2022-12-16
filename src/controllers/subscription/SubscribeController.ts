import { Request, Response } from "express";
import { SubscribeAnualService } from "../../services/subscriptions/SubscribeAnualService";
import { SubscribeMensalService } from "../../services/subscriptions/SubscribeMensalService";

class SubscribeAnualController {
    async handle(request: Request, response: Response) {
        const user_id = request.user_id

        const subscribeService = new SubscribeAnualService()

        const subscribe = await subscribeService.execute({
            user_id
        })

        return response.json(subscribe);
    }
}

class SubscribeMensalController {
    async handle(request: Request, response: Response) {
        const user_id = request.user_id

        const subscribeService = new SubscribeMensalService()

        const subscribe = await subscribeService.execute({
            user_id
        })

        return response.json(subscribe);
    }
}

export { SubscribeAnualController, SubscribeMensalController }