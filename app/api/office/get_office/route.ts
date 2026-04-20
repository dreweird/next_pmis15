import { db } from "../../../db";
import { auth } from "../../../auth";
import { off } from "node:cluster";

export  async function GET(){

 const session = await auth();

  if(!session?.user ){
    return new Response(`Unauthorized access`, {
      status: 401,
    })
  }
  try {
    const result = await db.users.findMany({
        where: {
          office: {
            not: ""
          }
        },
        orderBy: {
          office: "asc"
        }
      });
    return Response.json({ result })
  } catch (error) {
    return new Response(`Webhook error: ${(error as Error).message}`, {
      status: 400,
    })
   // res.status(403).json({success: false });
  }
}