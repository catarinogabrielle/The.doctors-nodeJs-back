import prismaClient from "../../prisma";

interface DeleteRequest {
    myclasse_id: string;
    user_id: string;
}

class DeleteMyClasseService {
    async execute({ myclasse_id, user_id }: DeleteRequest) {

        // Verificar se o usuário existe e é um teacher
        const user = await prismaClient.user.findUnique({
            where: {
                id: user_id
            },
            select: {
                id: true,
                type: true,
                mycourse_id: true
            }
        })

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        if (user.type !== "teacher") {
            throw new Error("Apenas professores podem excluir cursos");
        }

        // // Verificar se o curso pertence ao teacher
        // if (!user.mycourse_id.includes(myclasse_id)) {
        //     throw new Error("Você não tem permissão para excluir este curso");
        // }

        // Verificar se o curso existe
        const myclasseExists = await prismaClient.myclasse.findUnique({
            where: {
                id: myclasse_id
            }
        })

        if (!myclasseExists) {
            throw new Error("Curso não encontrado");
        }

        // Primeiro deletar todas as aulas (classes) associadas ao curso
        await prismaClient.classe.deleteMany({
            where: {
                myclasse_id: myclasse_id
            }
        })

        // Depois deletar o curso (myclasse)
        const myclasse = await prismaClient.myclasse.delete({
            where: {
                id: myclasse_id
            }
        })

        // Remover o curso do array mycourse_id do usuário
        await prismaClient.user.update({
            where: {
                id: user_id
            },
            data: {
                mycourse_id: {
                    set: user.mycourse_id.filter(id => id !== myclasse_id)
                }
            }
        })

        return myclasse;

    }
}

export { DeleteMyClasseService }
