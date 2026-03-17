import { db } from "../../../db";
import { NextRequest } from "next/server";
import { Prisma } from "../../../../generated/prisma/client";
import { auth } from "../../../auth";

export  async function POST(req: NextRequest){
 const session = await auth();

  if(!session?.user ){
    return new Response(`Unauthorized access`, {
      status: 401,
    })
  }
// Problem why auth is not working
try {
        const body  = await req.json(); // res now contains body
        const { mfo_id, col_name, value } = body
        await db.$executeRaw(
            Prisma.sql`UPDATE mfo set ${Prisma.raw(
              col_name
            )} =  ${value} where mfo_id = ${mfo_id}`
          );
        // update the logs table
        const action = `Updated MFO physical ${col_name} to ${value} with the mfo_id of ${mfo_id}`;
        await db.$executeRaw(
          Prisma.sql`INSERT into logs (user_id, actions, date_created) VALUES (${Number(session?.user?.id)}, ${action}, ${new Date()})`
        );
        return Response.json(true)
    } catch (error) {
        console.log(error);
        return Response.json(false)
    }
  

}
