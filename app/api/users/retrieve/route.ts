import { db } from "../../../db";
import { auth } from "../../../auth";

export  async function GET(){

 const session = await auth();

  if(!session?.user ){
    return new Response(`Unauthorized access`, {
      status: 401,
    })
  }
  try {
    const user_id = Number(session?.user?.id);
    const result = await db.users.findUnique({
        where: {
          user_id
        },
    
      })
    return Response.json({ result })
  } catch (error) {
    return new Response(`Webhook error: ${(error as Error).message}`, {
      status: 400,
    })
   // res.status(403).json({success: false });
  }
}