import { Request, Response } from 'express'
import { WebhookLive7Service } from '../../services/webhook/WebhookLive7Service'

class WebhookLive7Controller {
    async handle(req: Request, res: Response) {
        const { courseId } = req.params;
        const { evento, comprador } = req.body;

        // Responder 200 imediatamente (Live7 tem timeout de 10s)
        res.status(200).json({ received: true });

        // Processar webhook de forma assíncrona
        const webhookLive7Service = new WebhookLive7Service();

        webhookLive7Service.execute({
            courseId,
            evento,
            comprador,
        }).catch((err) => {
            console.error('Erro ao processar webhook Live7:', err.message);
        });
    }
}

export { WebhookLive7Controller }
