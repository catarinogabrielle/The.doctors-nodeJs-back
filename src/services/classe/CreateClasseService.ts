import prismaClient from "../../prisma"

interface ClasseRequest {
    material: string | null;
    title: string;
    description: string;
    myclasse_id: string;
    link: string;
}

class CreateClasseService {
    async execute({ material, description, myclasse_id, title, link }: ClasseRequest) {

        // verificar se ele colocou um titulo
        if (description === '') {
            throw new Error("Description invalid");
        }

        const lastClasse = await prismaClient.classe.findFirst({
            where: {
                myclasse_id,
            },
            orderBy: {
                sort_order: 'desc',
            },
            select: {
                sort_order: true,
            }
        })

        const classe = await prismaClient.classe.create({
            data: {
                material: material ?? null,
                description: description,
                myclasse_id: myclasse_id,
                title: title,
                link: link,
                sort_order: (lastClasse?.sort_order ?? -1) + 1
            },
            select: {
                id: true,
                material: true,
                description: true,
                myclasse_id: true,
                title: true,
                link: true,
                sort_order: true,
            }
        })

        return classe;
    }
}

export { CreateClasseService }