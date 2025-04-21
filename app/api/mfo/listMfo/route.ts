import { db } from "../../../db";

export  async function GET(){

  try {
    const result = await db.$queryRaw`
      SELECT * FROM mfo
      LEFT JOIN users ON mfo.user_id = users.user_id
     `
    return Response.json({ result })
  } catch (error) {
    return new Response(`Webhook error: ${(error as Error).message}`, {
      status: 400,
    })
   // res.status(403).json({success: false });
  }
}