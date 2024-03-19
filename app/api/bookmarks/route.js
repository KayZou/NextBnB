import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
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
    let message;
    if (isBooked) {
      user.bookmarks.pull(propertyId);
      message = "Removed from bookmarks";
      isBooked = false;
    } else {
      user.bookmarks.push(propertyId);
      message = "Added to bookmarks";
      isBooked = true;
    }
    await user.save();
    return new Response(JSON.stringify({ message, isBooked }), { status: 200 });
  } catch (error) {
    console.log(error.message || error);
    return new Response(JSON.stringify({ error: error.message || error }), {
      status: 500,
    });
  }
};

export const GET = async (req) => {
  try {
    await connectDB();
    const sessionUser = await getUserSession();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User id invalid", { status: 401 });
    }
    const { userId } = sessionUser;
    const user = await User.findById(userId);
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });
    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    console.log(error.message || error);
    return new Response(JSON.stringify({ error: error.message || error }), {
      status: 500,
    });
  }
};
