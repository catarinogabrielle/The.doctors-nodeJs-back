import prismaClient from "../../prisma"

class ListPublicMyClasseService {
    async execute() {
        const courses = await prismaClient.myclasse.findMany({
            select: {
                id: true,
                title: true,
                image: true,
                teachername: true,
                teacherphoto: true,
                description: true,
                time: true,
                category: true,
                paymentlink: true,
                _count: {
                    select: {
                        classes: true
                    }
                }
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return courses;
    }
}

export { ListPublicMyClasseService }
