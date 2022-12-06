import prismaClient from "../../prisma";

class FindClasseService {
  async execute(title: any) {
    if (title === "") return await prismaClient.myclasse.findMany();

    const searchedClasess = await prismaClient.myclasse.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
    });

    return searchedClasess;
  }
}

export { FindClasseService };
