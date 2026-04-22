import prismaClient from "../../prisma";

interface DetailRequest {
    myclasse_id: string;
}

class DetailMyClasseService {
    async execute({ myclasse_id }: DetailRequest) {

        const myclasse = await prismaClient.classe.findMany({
            where: {
                myclasse_id: myclasse_id
            },
            orderBy: [
                { sort_order: 'asc' },
                { created_at: 'asc' }
            ],
            include: {
                myclasse: true,
            }
        })

        return myclasse;

    }
}

export { DetailMyClasseService }