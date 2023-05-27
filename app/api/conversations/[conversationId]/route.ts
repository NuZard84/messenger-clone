import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  conversationId?: string;
}

export default async function DELETE(
  req: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const currentUser = getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    // const deletedConversation = await prisma;
  } catch (error: any) {
    console.log(error, "ERROR_CONVERSATION_DELETE");
    return new NextResponse("Internal Error", { status: 500 });
  }
}