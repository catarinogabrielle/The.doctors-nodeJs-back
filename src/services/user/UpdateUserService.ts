import prismaClient from '../../prisma'

interface UserRequest {
    userId: string;
    courseId: string;
}

class UpdateUserService {
    async execute({courseId, userId  }: UserRequest) {

        const user = await prismaClient.user.findFirst({
            where: {
                id: userId
            }
        })

        user.mycourse_id.push(courseId)
        const newListOfCourses = user.mycourse_id;

        const newUser = await prismaClient.user.update({
            where: {
                id: user.id
            }, data: {
                mycourse_id: newListOfCourses,
            },
        })

        return newUser;
    }
}

export { UpdateUserService }