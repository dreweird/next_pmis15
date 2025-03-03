import { db } from "../../../db";
import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";

export  async function POST(req: NextRequest){
// Problem why auth is not working
try {
        const body  = await req.json(); // res now contains body
        const { id, col_name, value } = body
        await db.$executeRaw(
            Prisma.sql`UPDATE district set ${Prisma.raw(
              col_name
            )} =  ${value} where id = ${id}`
          );
        return Response.json(true)
    } catch (error) {
        console.log(error);
        return Response.json(false)
    }
  

}