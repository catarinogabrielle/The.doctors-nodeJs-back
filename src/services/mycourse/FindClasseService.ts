import prismaClient from "../../prisma"

class FindClasseService {
    async execute( title: string) {

        // const allClasses = await prismaClient.myclasse.find();

        const searchedClasess = await prismaClient.myclasse.findMany({
            where: {
                title: {
                    contains: title
                }
            }
        });

        return searchedClasess;

    }
}

export { FindClasseService }