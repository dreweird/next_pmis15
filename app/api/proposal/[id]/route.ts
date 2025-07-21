import { db } from "../../../db";
import { auth } from "../../../auth";

export async function GET(
 req: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  const session = await auth();

  if (!session?.user) {
    return new Response(`Unauthorized access`, { status: 401 });
  }

  const id = (await params).id;

  try {
    const result = await db.proposal.findUnique({
      where: { id }
    });

    if (!result) {
      return Response.json({ error: `Proposal not found` }, { status: 404 });
    }

    return Response.json({ result });
  } catch (error) {
    return new Response(`Webhook error: ${(error as Error).message}`, {
      status: 400,
    });
  }
}
