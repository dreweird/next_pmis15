import { db } from "../../../db";
import { auth } from "../../../auth";

export  async function GET(req: Request, { params }: {params: Promise<{id: string}>}){

 const session = await auth();

  if(!session?.user ){
    return new Response(`Unauthorized access`, {
      status: 401,
    })
  }
  try {
    const user_id = (await params).id;
     const result = await db.users.findFirst({
        where: {
          user_id: Number(user_id)
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