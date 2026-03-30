import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

interface WebhookLive7Request {
    courseId: string;
    evento: string;
    comprador: {
        nome: string | null;
        email: string | null;
        telefone: string | null;
        documento: string | null;
    };
}

class WebhookLive7Service {
    async execute({ courseId, evento, comprador }: WebhookLive7Request) {

        if (evento !== 'venda_confirmada') {
            throw new Error('Evento inválido');
        }

        if (!comprador?.email) {
            throw new Error('Email do comprador é obrigatório');
        }

        // Verificar se o curso existe
        const course = await prismaClient.myclasse.findFirst({
            where: { id: courseId }
        });

        if (!course) {
            throw new Error('Curso não encontrado');
        }

        // Buscar usuário pelo email
        let user = await prismaClient.user.findFirst({
            where: { email: comprador.email }
        });

        // Se o usuário não existe, criar com senha = CPF (documento)
        if (!user) {
            if (!comprador.documento) {
                throw new Error('Documento do comprador é obrigatório para criar conta');
            }

            const documentoDigits = comprador.documento.replace(/\D/g, '');
            const passwordHash = await hash(documentoDigits, 8);

            user = await prismaClient.user.create({
                data: {
                    name: comprador.nome || comprador.email,
                    email: comprador.email,
                    password: passwordHash,
                }
            });
        }

        // Verificar se o usuário já está matriculado (idempotência)
        if (user.mycourse_id.includes(courseId)) {
            return { message: 'Usuário já matriculado neste curso' };
        }

        // Matricular o usuário no curso
        const updatedCourses = [...user.mycourse_id, courseId];

        await prismaClient.user.update({
            where: { id: user.id },
            data: { mycourse_id: updatedCourses }
        });

        return { message: 'Usuário matriculado com sucesso' };
    }
}

export { WebhookLive7Service }
