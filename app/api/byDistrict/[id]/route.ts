import { db } from "../../../db";
import { auth } from "../../../auth";

export  async function GET(req: Request, { params }: {params: Promise<{id: number}>}){

 const session = await auth();

  if(!session?.user ){
    return new Response(`Unauthorized access`, {
      status: 401,
    })
  }
  const id = (await params).id;

  try {
    const result = await db.$queryRaw`
      SELECT district.id, district.province, district.municipal, 
      district.target,district.cost,district.groups,mfo.name, mfo.mfo_id, district.flagged, district.remarks,
      district.jan, district.feb, district.mar, district.apr, district.may, district.jun,
      district.jul, district.aug, district.sep, district.oct, district.nov, district.dece FROM district
      INNER JOIN mfo ON mfo.mfo_id = district.mfo_id
      INNER JOIN users ON users.user_id = mfo.user_id
      WHERE mfo.user_id = ${id} and mfo.area =1 
      ORDER BY district.province, district.municipal, district.mfo_id
     `
    return Response.json({ result })
  } catch (error) {
    return new Response(`Webhook error: ${(error as Error).message}`, {
      status: 400,
    })
   // res.status(403).json({success: false });
  }

}