import { db } from "../../../db";
import { auth } from "../../../auth";
import { NextRequest } from "next/server";

export  async function POST(req: NextRequest){

 const session = await auth();

  if(!session?.user ){
    return new Response(`Unauthorized access`, {
      status: 401,
    })
  }
try {
    const body  = await req.json(); // res now contains body
    for (const result of body) {
    
      await db.district.create({
        data: {
            barangay: result.barangay,
            cost: Number(result.cost),
            district: result.district,
            mfo_id : Number(result.mfo_id),
            municipal: result.municipal,
            province: result.province,
            target: Number(result.target),
            groups: result.groups,
            flagged: 0,
            remarks: "",
            remarks_q1: "",
            remarks_q2: "",
            remarks_q3: "",
            remarks_q4: ""
          }
      });
    }
    return Response.json({ success: true })
    } catch (error) {
    console.log(error);
    return new Response(`Webhook error: ${(error as Error).message}`, {
        status: 400,
        })
    }
  

}