import prisma from "../libs/prismadb";

const getMessages = async (conversationId: string) => {
  try {
    const mesages = await prisma.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return mesages;
  } catch (error: any) {
    return [];
  }
};

export default getMessages;
