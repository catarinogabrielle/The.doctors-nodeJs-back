import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

interface CreateTeacherRequest {
    name: string;
    email: string;
    password: string;
}

class CreateTeacherService {
    async execute({ name, email, password }: CreateTeacherRequest) {

        if (!email) {
            throw new Error("Email incorreto");
        }

        if (!name) {
            throw new Error("Nome é obrigatório");
        }

        if (!password) {
            throw new Error("Senha é obrigatória");
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (userAlreadyExists) {
            throw new Error("Já existe um usuário com este email");
        }

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                type: "teacher",
            },
            select: {
                id: true,
                name: true,
                email: true,
                type: true,
            }
        });

        return user;
    }
}

export { CreateTeacherService }
