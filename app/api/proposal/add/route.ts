import { db } from "../../../db";
import { auth } from "../../../auth";
import { NextRequest } from "next/server";

export  async function POST(req: NextRequest){

 const session = await auth();

  if(!session?.user ){
    return new Response(`Unauthorized access`, {
      status: 401,
    })
  }
  
  try {
      const body  = await req.json();
      const { user_id, item, qty, enduser, purpose} = body;
      
      await db.proposal.create({
          data: {
              user_id: Number(session?.user?.id ?? user_id),
              item: item,
              qty: qty,
              enduser: enduser,
              purpose: purpose
          }
        });
      
      return Response.json({ success: true })
      } catch (error) {
      console.log(error);
      return new Response(`Webhook error: ${(error as Error).message}`, {
          status: 400,
          })
      }
  }