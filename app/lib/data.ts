"use server";
import { auth } from "../auth";
import { db } from "../db";

export async function checkStatusComplete() {
  const session = await auth();

  if (!session) {
    return {
      success: false,
      message: "Unauthorized action.",
    };
  }

  try {
    const data = await db.users.findUnique({
      where: {
        user_id: Number(session.user.id),
      },
    });

    if (!data) {
      return {
        success: false,
        message: "Unable to locate data.",
      };
    }

    if (data.status !== 2 || data.status_1 !== 2 || data.status_3 !== 2) {
      return {
        success: false,
        message: "All BEDs haven't been approved yet.",
      };
    }

    return {
      success: true,
      message: "All BEDs has been approved.",
    };
  } catch {
    return {
      success: false,
      message: "Database error. Please try again later.",
    };
  }
}
