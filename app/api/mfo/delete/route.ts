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
    const { id }  = await req.json(); // res now contains body
    await db.mfo.delete({
        where:{
            mfo_id: Number(id),
        }
    })
    return Response.json({ success: true })
    } catch (error) {
    console.log(error);
    return new Response(`Webhook error: ${(error as Error).message}`, {
        status: 400,
        })
    }
  

}