import prismaClient from '../../prisma'

class ListStudentsService {
    async execute() {
        const students = await prismaClient.user.findMany({
            where: {
                type: 'student'
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
            orderBy: {
                name: 'asc'
            }
        })

        return students;
    }
}

export { ListStudentsService }
