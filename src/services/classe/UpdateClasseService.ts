import prismaClient from "../../prisma"

interface UpdateClasseRequest {
    classe_id: string;
    title?: string;
    description?: string;
    link?: string;
    status?: boolean;
    draft?: boolean;
    material?: string;
}

class UpdateClasseService {
    async execute({ classe_id, title, description, link, status, draft, material }: UpdateClasseRequest) {
        if (description !== undefined && description.trim() === '') {
            throw new Error("Description invalid");
        }

        if (title !== undefined && title.trim() === '') {
            throw new Error("Title invalid");
        }

        const classe = await prismaClient.classe.update({
            where: {
                id: classe_id,
            },
            data: {
                title,
                description,
                link,
                status,
                draft,
                material,
            },
            select: {
                id: true,
                title: true,
                description: true,
                link: true,
                sort_order: true,
                status: true,
                draft: true,
                material: true,
                myclasse_id: true,
            }
        })

        return classe;
    }
}

export { UpdateClasseService }
