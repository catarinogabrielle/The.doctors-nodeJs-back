import prismaClient from "../../prisma"

interface DeleteClasseRequest {
    classe_id: string;
}

class DeleteClasseService {
    async execute({ classe_id }: DeleteClasseRequest) {
        if (!classe_id) {
            throw new Error("Classe ID is required");
        }

        const classe = await prismaClient.classe.delete({
            where: {
                id: classe_id,
            },
        })

        return classe;
    }
}

export { DeleteClasseService }
