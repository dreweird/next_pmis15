import { db } from "../../../db";

export  async function GET(){

  try {
   const result = await db.$queryRaw`
    SELECT 
    u.user_id,
    u.office,
    u.type
    from users u
    inner join mfo m on u.user_id = m.user_id
    group by u.user_id
  `
    return Response.json({ result })
  } catch (error) {
    return new Response(`Webhook error: ${(error as Error).message}`, {
      status: 400,
    })
   // res.status(403).json({success: false });
  }
}