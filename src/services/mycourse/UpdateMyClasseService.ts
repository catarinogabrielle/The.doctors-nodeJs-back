import prismaClient from "../../prisma"

interface UpdateMyclasseRequest {
    myclasse_id: string;
    title?: string;
    image?: string;
    teacherphoto?: string;
    teacherwork?: string;
    teachername?: string;
    teacherinfo?: string;
    description?: string;
    time?: string;
    link?: string;
    paymentlink?: string;
    category?: string;
}

class UpdateMyClasseService {
    async execute({
        myclasse_id,
        title,
        image,
        teacherphoto,
        teacherwork,
        teachername,
        teacherinfo,
        description,
        time,
        link,
        paymentlink,
        category,
    }: UpdateMyclasseRequest) {
        if (title !== undefined && title.trim() === '') {
            throw new Error("Title invalid");
        }

        const myclasse = await prismaClient.myclasse.update({
            where: {
                id: myclasse_id,
            },
            data: {
                title,
                image,
                teacherphoto,
                teacherwork,
                teachername,
                teacherinfo,
                description,
                time,
                link,
                paymentlink,
                category,
            },
            select: {
                id: true,
                title: true,
                image: true,
                teachername: true,
                teacherphoto: true,
                teacherwork: true,
                teacherinfo: true,
                description: true,
                time: true,
                link: true,
                paymentlink: true,
                category: true,
            },
        })

        return myclasse;
    }
}

export { UpdateMyClasseService }
