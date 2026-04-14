import { Request, Response } from 'express'
import { WebhookLive7Service } from '../../services/webhook/WebhookLive7Service'

class WebhookLive7Controller {
    async handle(req: Request, res: Response) {
        const { courseId } = req.params;
        const { evento, comprador } = req.body;

        console.log('========== [WEBHOOK LIVE7] Requisição recebida ==========');
        console.log(`[WEBHOOK LIVE7] Timestamp: ${new Date().toISOString()}`);
        console.log(`[WEBHOOK LIVE7] CourseId: ${courseId}`);
        console.log(`[WEBHOOK LIVE7] Evento: ${evento}`);
        console.log(`[WEBHOOK LIVE7] Comprador: ${JSON.stringify(comprador)}`);

        // Responder 200 imediatamente (Live7 tem timeout de 10s)
        res.status(200).json({ received: true });

        // Processar webhook de forma assíncrona
        const webhookLive7Service = new WebhookLive7Service();

        webhookLive7Service.execute({
            courseId,
            evento,
            comprador,
        }).then((result) => {
            console.log(`[WEBHOOK LIVE7] Processamento concluído com sucesso:`, result);
            console.log('========== [WEBHOOK LIVE7] Fim ==========');
        }).catch((err) => {
            console.error(`[WEBHOOK LIVE7] Erro ao processar: ${err.message}`);
            console.log('========== [WEBHOOK LIVE7] Fim (com erro) ==========');
        });
    }
}

export { WebhookLive7Controller }
