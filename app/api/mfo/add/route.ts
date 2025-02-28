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
    
      await db.mfo.create({
        data: {
          user_id : Number(session?.user?.id),
          h1: result.h1,
          h2: result.h2,
          h3: result.h3,
          h4: result.h4,
          name: result.mfo,
          unit: result.unit,
          main: Number(result.main),
          area: Number(result.area),
          reviewer_remarks: "",
          jan_otc: 0, feb_otc: 0, mar_otc:0, apr_otc:0, may_otc:0, jun_otc:0, jul_otc:0, aug_otc:0, sep_otc:0, oct_otc:0, nov_otc:0, dec_otc:0,
          jan_dtc: 0, feb_dtc: 0, mar_dtc:0, apr_dtc: 0, may_dtc: 0, jun_dtc:0, jul_dtc:0, aug_dtc:0, sep_dtc:0, oct_dtc:0, nov_dtc:0, dec_dtc:0,
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