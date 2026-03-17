import { db } from "../../../db";
import { auth } from "../../../auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return new Response(`Unauthorized access`, {
      status: 401,
    });
  }
  const id = Number((await params).id);

  try {
    const result = await db.$queryRaw`
  SELECT logs.date_created FROM logs 
      WHERE logs.user_id =  ${id}
      ORDER BY id DESC LIMIT 1;
     `;
    return Response.json({ result });
  } catch (error) {
    return new Response(`Webhook error: ${(error as Error).message}`, {
      status: 400,
    });
    // res.status(403).json({success: false });
  }
}
