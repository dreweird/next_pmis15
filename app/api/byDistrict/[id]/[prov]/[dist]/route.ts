import { db } from "../../../../../db";
import { auth } from "../../../../../auth";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      prov: any;
      dist: any;
      id: number;
    }>;
  }
) {
  const session = await auth();

  if (!session?.user) {
    return new Response(`Unauthorized access`, {
      status: 401,
    });
  }
  const id = (await params).id;
  const prov = (await params).prov;
  const dist = (await params).dist;

  console.log(id, prov, dist);

  try {
    // const result = await db.$queryRaw`
    //   SELECT district.id, district.province, district.municipal,
    //   mfo.h1, mfo.h2, mfo.h3, mfo.h4, mfo.unit,
    //   district.target, district.cost,district.groups,mfo.name, mfo.mfo_id, district.flagged, district.remarks,
    //   district.jan, district.feb, district.mar, district.apr, district.may, district.jun,
    //   district.jul, district.aug, district.sep, district.oct, district.nov, district.dece FROM district
    //   INNER JOIN mfo ON mfo.mfo_id = district.mfo_id
    //   INNER JOIN users ON users.user_id = mfo.user_id
    //   WHERE mfo.user_id = ${Number(
    //     id
    //   )} and mfo.area =1 and district.province = ${String(
    //   prov
    // )} and district.district = ${Number(dist)}
    //   ORDER BY district.province, district.municipal, district.mfo_id
    //  `;

    const result = await db.$queryRaw`
      SELECT 
        district.id, 
        district.province, 

        GROUP_CONCAT(CONCAT(district.municipal, ' [', district.target, ']') ORDER BY district.municipal SEPARATOR ', ') AS municipal,

        mfo.h1, mfo.h2, mfo.h3, mfo.h4, mfo.unit,
        mfo.name, 
        mfo.mfo_id, 
        
        SUM(district.target) AS target, 
        SUM(district.cost) AS cost, 
        district.groups, 
        district.flagged, 
        district.remarks,

        GROUP_CONCAT(CONCAT(district.municipal, ' [', 
          COALESCE(district.jan, 0) + COALESCE(district.feb, 0) + COALESCE(district.mar, 0), 
          ']') ORDER BY district.municipal SEPARATOR ', ') AS Q1,

        GROUP_CONCAT(CONCAT(district.municipal, ' [', 
          COALESCE(district.apr, 0) + COALESCE(district.may, 0) + COALESCE(district.jun, 0), 
          ']') ORDER BY district.municipal SEPARATOR ', ') AS Q2,

        GROUP_CONCAT(CONCAT(district.municipal, ' [', 
          COALESCE(district.jul, 0) + COALESCE(district.aug, 0) + COALESCE(district.sep, 0), 
          ']') ORDER BY district.municipal SEPARATOR ', ') AS Q3,

        GROUP_CONCAT(CONCAT(district.municipal, ' [', 
          COALESCE(district.oct, 0) + COALESCE(district.nov, 0) + COALESCE(district.dece, 0), 
          ']') ORDER BY district.municipal SEPARATOR ', ') AS Q4,
        
        SUM(
          COALESCE(district.jan, 0) + COALESCE(district.feb, 0) + COALESCE(district.mar, 0) +
          COALESCE(district.apr, 0) + COALESCE(district.may, 0) + COALESCE(district.jun, 0) +
          COALESCE(district.jul, 0) + COALESCE(district.aug, 0) + COALESCE(district.sep, 0) +
          COALESCE(district.oct, 0) + COALESCE(district.nov, 0) + COALESCE(district.dece, 0)
        ) AS TOTAL

      FROM district
      INNER JOIN mfo ON mfo.mfo_id = district.mfo_id
      INNER JOIN users ON users.user_id = mfo.user_id

      WHERE 
        mfo.user_id = ${Number(id)} 
        AND mfo.area = 1 
        AND district.province = ${String(prov)} 
        AND district.district = ${Number(dist)}

      GROUP BY mfo.mfo_id;

     `;

    return Response.json({ result });
  } catch (error) {
    return new Response(`Webhook error: ${(error as Error).message}`, {
      status: 400,
    });
    // res.status(403).json({success: false });
  }
}
