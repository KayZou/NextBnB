import connectDB from "@/config/database";
import User from "@/models/User";
import { getUserSession } from "@/utils/getUserSession";

export const dynamic = "force-dynamic";

export const POST = async (req) => {
  try {
    await connectDB();
    const { propertyId } = await req.json();
    const sessionUser = await getUserSession();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User id invalid", { status: 401 });
    }
    const { userId } = sessionUser;

    const user = await User.findById(userId);
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    let isBooked = user.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isBooked }), { status: 200 });
  } catch (error) {
    console.log(error.message || error);
    return new Response(JSON.stringify({ error: error.message || error }), {
      status: 500,
    });
  }
};
