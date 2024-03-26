import connectDB from "@/config/database";
import { getUserSession } from "@/utils/getUserSession";
import Message from "@/models/Message";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, phone, body, property, recipient } = await req.json();
    const sessionUser = await getUserSession();
    if (!sessionUser || !sessionUser.user) {
      return new Response(
        JSON.stringify({ message: "You must be logged in" }),
        { status: 401 }
      );
    }
    const { user, userId } = sessionUser;
    // console.log(user.id);
    if (userId === recipient) {
      return new Response(
        JSON.stringify({ message: "Can't send message to yourself" }),
        { status: 400 }
      );
    }
    const newMessage = new Message({
      sender: user.id,
      name,
      recipient,
      email,
      phone,
      body,
      property,
    });
    await newMessage.save();
    return new Response(JSON.stringify({ message: "Message sent" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error.message || error);
    return new Response(JSON.stringify({ error: error.message || error }), {
      status: 500,
    });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const sessionUser = await getUserSession();
    if (!sessionUser || !sessionUser.user) {
      return new Response(
        JSON.stringify({ message: "You must be logged in" }),
        { status: 401 }
      );
    }
    const { user, userId } = sessionUser;
    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");
    const unReadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");
    const messages = [...unReadMessages, ...readMessages];
    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.log(error.message || error);
    return new Response(JSON.stringify({ error: error.message || error }), {
      status: 500,
    });
  }
}
