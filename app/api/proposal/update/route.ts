import { db } from "../../../db";
import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "../../../auth";

export  async function PUT(req: NextRequest){
  
  const session = await  auth();

  if(!session?.user ){
      return new Response(`Unauthorized access`, {
      status: 401,
      }
    )
  }
  
  try {
      const body  = await req.json();
      const { id, user_id, item, qty, enduser, purpose } = body
         
      await db.proposal.update({
          where: {
            id: Number(id)
          },
          data: {
            user_id: user_id,
            item: item,
            qty: qty,
            enduser: enduser,
            purpose: purpose,
          }
      });

      return Response.json(true)

    } catch (error) {

        console.log(error);
        return Response.json(false)
    }
}