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

        console.log(`[WEBHOOK LIVE7 SERVICE] Iniciando processamento...`);

        if (evento !== 'venda_confirmada') {
            console.log(`[WEBHOOK LIVE7 SERVICE] Evento ignorado: "${evento}" (esperado: "venda_confirmada")`);
            throw new Error('Evento inválido');
        }

        if (!comprador?.email) {
            console.log(`[WEBHOOK LIVE7 SERVICE] Email do comprador ausente. Abortando.`);
            throw new Error('Email do comprador é obrigatório');
        }

        // Verificar se o curso existe
        console.log(`[WEBHOOK LIVE7 SERVICE] Buscando curso: ${courseId}`);
        const course = await prismaClient.myclasse.findFirst({
            where: { id: courseId }
        });

        if (!course) {
            console.log(`[WEBHOOK LIVE7 SERVICE] Curso não encontrado: ${courseId}`);
            throw new Error('Curso não encontrado');
        }
        console.log(`[WEBHOOK LIVE7 SERVICE] Curso encontrado: "${course.title}"`);

        // Buscar usuário pelo email
        console.log(`[WEBHOOK LIVE7 SERVICE] Buscando usuário pelo email: ${comprador.email}`);
        let user = await prismaClient.user.findFirst({
            where: { email: comprador.email }
        });

        let userCreated = false;

        // Se o usuário não existe, criar com senha = CPF (documento)
        if (!user) {
            console.log(`[WEBHOOK LIVE7 SERVICE] Usuário não encontrado. Criando novo usuário...`);

            if (!comprador.documento) {
                console.log(`[WEBHOOK LIVE7 SERVICE] Documento ausente. Não é possível criar conta.`);
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
            userCreated = true;
            console.log(`[WEBHOOK LIVE7 SERVICE] Usuário criado com sucesso. ID: ${user.id}, Nome: ${user.name}, Email: ${user.email}`);
        } else {
            console.log(`[WEBHOOK LIVE7 SERVICE] Usuário já existe. ID: ${user.id}, Nome: ${user.name}, Email: ${user.email}`);
        }

        // Verificar se o usuário já está matriculado (idempotência)
        if (user.mycourse_id.includes(courseId)) {
            console.log(`[WEBHOOK LIVE7 SERVICE] Usuário já matriculado no curso ${courseId}. Nenhuma ação necessária.`);
            return { message: 'Usuário já matriculado neste curso', userCreated };
        }

        // Matricular o usuário no curso
        const updatedCourses = [...user.mycourse_id, courseId];

        await prismaClient.user.update({
            where: { id: user.id },
            data: { mycourse_id: updatedCourses }
        });

        console.log(`[WEBHOOK LIVE7 SERVICE] Usuário ${user.email} matriculado no curso "${course.title}" (${courseId})`);
        console.log(`[WEBHOOK LIVE7 SERVICE] Resumo: userCreated=${userCreated}, courseLinked=true`);

        return { message: 'Usuário matriculado com sucesso', userCreated, courseLinked: true };
    }
}

export { WebhookLive7Service }
