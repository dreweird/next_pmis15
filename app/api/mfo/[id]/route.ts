import { db } from "../../../db";
import { auth } from "../../../auth";

export  async function GET(req: Request, { params }: {params: {id: number}}){

 const session = await auth();

  if(!session?.user ){
    return new Response(`Unauthorized access`, {
      status: 401,
    })
  }
  const id = (await params).id;

  try {
    const result = await db.$queryRaw`
        SELECT * FROM mfo
            LEFT JOIN users ON mfo.user_id = users.user_id
            WHERE mfo.user_id =  ${id}
     `
    return Response.json({ result })
  } catch (error) {
    return new Response(`Webhook error: ${(error as Error).message}`, {
      status: 400,
    })
   // res.status(403).json({success: false });
  }

}