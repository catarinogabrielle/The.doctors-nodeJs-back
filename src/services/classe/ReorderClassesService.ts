import prismaClient from "../../prisma"

interface ReorderClassesRequest {
    myclasse_id: string;
    ordered_class_ids: string[];
}

class ReorderClassesService {
    async execute({ myclasse_id, ordered_class_ids }: ReorderClassesRequest) {
        if (!myclasse_id) {
            throw new Error("MyClasse ID is required")
        }

        if (!ordered_class_ids || ordered_class_ids.length === 0) {
            throw new Error("Ordered class IDs are required")
        }

        const uniqueOrderedIds = new Set(ordered_class_ids)
        if (uniqueOrderedIds.size !== ordered_class_ids.length) {
            throw new Error("Duplicate class IDs are not allowed")
        }

        const classes = await prismaClient.classe.findMany({
            where: {
                myclasse_id,
            },
            select: {
                id: true,
            }
        })

        if (classes.length !== ordered_class_ids.length) {
            throw new Error("Invalid classes list for reorder")
        }

        const existingIds = new Set(classes.map((item) => item.id))

        if (existingIds.size !== uniqueOrderedIds.size) {
            throw new Error("Invalid classes list for reorder")
        }

        for (const classeId of ordered_class_ids) {
            if (!existingIds.has(classeId)) {
                throw new Error("Invalid class ID in reorder payload")
            }
        }

        await prismaClient.$transaction(
            ordered_class_ids.map((classeId, index) =>
                prismaClient.classe.update({
                    where: {
                        id: classeId,
                    },
                    data: {
                        sort_order: index,
                    },
                })
            )
        )

        const updatedClasses = await prismaClient.classe.findMany({
            where: {
                myclasse_id,
            },
            orderBy: [
                { sort_order: 'asc' },
                { created_at: 'asc' }
            ]
        })

        return updatedClasses
    }
}

export { ReorderClassesService }
