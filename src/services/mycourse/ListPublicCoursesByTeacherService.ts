import prismaClient from "../../prisma"

interface ListPublicCoursesByTeacherRequest {
    teacher_id: string;
}

class ListPublicCoursesByTeacherService {
    async execute({ teacher_id }: ListPublicCoursesByTeacherRequest) {
        const teacher = await prismaClient.user.findFirst({
            where: {
                id: teacher_id,
                type: "teacher"
            },
            select: {
                mycourse_id: true
            }
        });

        if (!teacher) {
            throw new Error("Professor não encontrado");
        }

        const courses = await prismaClient.myclasse.findMany({
            where: {
                id: {
                    in: teacher.mycourse_id
                }
            },
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

export { ListPublicCoursesByTeacherService }
