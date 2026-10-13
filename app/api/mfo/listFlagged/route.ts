import { auth } from "../../../auth";
import { db } from "../../../db";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return new Response(`Unauthorized access`, {
      status: 401,
    });
  }
  try {
    const result = await db.mfo.findMany({
      where: {
        user_id: Number(session.user.id),
        OR: [{ flagged: 1 }, { flagged_1: 1 }, { flagged_3: 1 }],
      },
    });
    console.log("USer ID: ", session.user.id);
    return Response.json({ result });
  } catch (error) {
    return new Response(`Webhook error: ${(error as Error).message}`, {
      status: 400,
    });
    // res.status(403).json({success: false });
  }
}
