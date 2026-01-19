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
   const result = await db.$queryRaw`
      SELECT p.id, p.user_id, p.item, p.qty, p.enduser, p.purpose, u.username, u.first_name
      FROM proposal p
      INNER JOIN users u ON p.user_id = u.user_id
      WHERE u.user_id =  ${session?.user?.id}
    `;

    return Response.json({ result })
  } catch (error) {
    return new Response(`Webhook error: ${(error as Error).message}`, {
      status: 400,
    })
  }
}