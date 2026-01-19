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
    const body  = await req.json(); // res now contains body
    const {actions, user_id} = body

    await db.logs.create({
      data: {
        actions,
        user_id: user_id,
        date_created: new Date().toDateString()
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