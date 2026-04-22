import prismaClient from "../../prisma"

interface ClasseRequest {
    myclasse_id: string;
}

class ListByMyClasseService {
    async execute({ myclasse_id }: ClasseRequest) {

        const findByMyClasse = await prismaClient.classe.findMany({
            where: {
                myclasse_id: myclasse_id,
            },
            orderBy: [
                { sort_order: 'asc' },
                { created_at: 'asc' }
            ]
        })

        return findByMyClasse;
    }
}

export { ListByMyClasseService }