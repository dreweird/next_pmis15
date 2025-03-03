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
      SELECT district.id, district.province, district.municipal, 
      district.target,district.cost,district.groups,mfo.name, mfo.mfo_id, district.flagged, district.remarks,
      district.jan, district.feb, district.mar, district.apr, district.may, district.jun,
      district.jul, district.aug, district.sep, district.oct, district.nov, district.dece FROM district
      INNER JOIN mfo ON mfo.mfo_id = district.mfo_id
      INNER JOIN users ON users.user_id = mfo.user_id
      WHERE mfo.user_id = ${session?.user?.id} and mfo.area =1 
      ORDER BY district.province, district.municipal
     `
    return Response.json({ result })
  } catch (error) {
    return new Response(`Webhook error: ${(error as Error).message}`, {
      status: 400,
    })
   // res.status(403).json({success: false });
  }
}