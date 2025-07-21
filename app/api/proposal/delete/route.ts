import { db } from "../../../db";
import { auth } from "../../../auth";
import { NextRequest } from "next/server";

export  async function DELETE(req: NextRequest){

 const session = await auth();

  if(!session?.user ){
    return new Response(`Unauthorized access`, {
      status: 401,
    })
  }

  try {
      const body  = await req.json();
      const { id } = body;

      await db.proposal.delete({
          where:{
              id: Number(id),
          }
      })

      return Response.json({ success: true })

      } catch (error) {
      console.log(error);
      return new Response(`Webhook error: ${(error as Error).message}`, {
          status: 400,
        }
      )
    }
}