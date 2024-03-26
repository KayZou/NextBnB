import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getUserSession } from "@/utils/getUserSession";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectDB();

    const session = await getUserSession();
    if (!session || !session.user) {
      return new Response(JSON.stringify({ error: "You must be logged in" }), {
        status: 401,
      });
    }
    const { userId } = session;
    const count = await Message.countDocuments({
      recipient: userId,
      read: false,
    });
    return new Response(JSON.stringify(count), {
      status: 200,
    });
  } catch (error) {
    console.log(error.message || error);
    return new Response(JSON.stringify(error.message || error), {
      status: 500,
    });
  }
}
