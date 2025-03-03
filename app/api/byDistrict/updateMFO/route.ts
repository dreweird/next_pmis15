import { db } from "../../../db";
import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";

export  async function POST(req: NextRequest){
// Problem why auth is not working
try {
        const body  = await req.json(); // res now contains body
        let { id, col_name } = body
        console.log(col_name, id)
        const result: { sum: number }[] =  await db.$queryRawUnsafe(`SELECT SUM(${col_name}) as sum from district where mfo_id = ${id}`);
        let newValue = Number(result[0].sum);

        if(col_name === "dece") {
            col_name = "dec_pa" 
        }
        if(col_name === "jan") {
            col_name = "jan_pa"
        }
        if(col_name === "feb") {
            col_name = "feb_pa"
        }
        if(col_name === "mar") {
            col_name = "mar_pa"
        }
        if(col_name === "apr") {
            col_name = "apr_pa"
        }
        if(col_name === "may") {
            col_name = "may_pa"
        }
        if(col_name === "jun") {
            col_name = "jun_pa"
        }
        if(col_name === "jul") {
            col_name = "jul_pa"
        }
        if(col_name === "aug") {
            col_name = "aug_pa"
        }
        if(col_name === "sep") {
            col_name = "sep_pa"
        }
        if(col_name === "oct") {
            col_name = "oct_pa"
        }
        if(col_name === "nov") {
            col_name = "nov_pa"
        }
        await db.$executeRaw(
            Prisma.sql`UPDATE mfo set ${Prisma.raw(
              col_name
            )} =  ${newValue} where mfo_id = ${id}`
          );
        return Response.json(true)
    } catch (error) {
        console.log(error);
        return Response.json(false)
    }
  

}