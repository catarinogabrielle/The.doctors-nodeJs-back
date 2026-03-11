import { NextFunction, Request, Response } from "express";
import prismaClient from "../prisma";

export async function isGestor(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const user_id = req.user_id;

    if (!user_id) {
        return res.status(401).end();
    }

    const user = await prismaClient.user.findFirst({
        where: { id: user_id },
        select: { type: true }
    });

    if (!user || user.type !== "gestor") {
        return res.status(403).json({ error: "Acesso permitido apenas para gestores." });
    }

    return next();
}
