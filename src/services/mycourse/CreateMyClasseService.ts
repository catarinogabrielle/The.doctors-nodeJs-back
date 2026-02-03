import prismaClient from "../../prisma"

interface MyclasseRequest {
    title: string;
    image: string;
    teacherphoto: string;
    teacherwork: string,
    teachername: string;
    teacherinfo: string;
    description: string;
    time: string;
    link: string;
    paymentlink: string;
}

class CreateMyClasseService {
    async execute({ title, link, image, teacherphoto, teachername, teacherinfo, teacherwork, description, time, paymentlink }: MyclasseRequest) {

        // verificar se ele colocou um titulo
        if (title === '') {
            throw new Error("Title invalid");
        }

        const myclasse = await prismaClient.myclasse.create({
            data: {
                title: title,
                image: image,
                teachername: teachername,
                teacherphoto: teacherphoto,
                teacherwork: teacherwork,
                teacherinfo: teacherinfo,
                description: description,
                time: time,
                link: link,
                paymentlink: paymentlink
            },
            select: {
                title: true,
                image: true,
                teachername: true,
                teacherphoto: true,
                teacherwork: true,
                teacherinfo: true,
                description: true,
                time: true,
                link: true,
                paymentlink: true
            }
        })

        return myclasse;
    }
}

export { CreateMyClasseService }