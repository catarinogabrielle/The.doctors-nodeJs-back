import { Request, Response } from "express";
import Stripe from 'stripe';
import { stripe } from '../../utils/stripe';

class WebhooksController {
    async handle(request: Request, response: Response) {

    }
}

export { WebhooksController }