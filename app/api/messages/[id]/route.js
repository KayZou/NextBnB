import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getUserSession } from "@/utils/getUserSession";

export const dynamic = "force-dynamic";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const session = await getUserSession();
    if (!session || !session.user) {
      return new Response(JSON.stringify({ error: "You must be logged in" }), {
        status: 401,
      });
    }
    const { userId } = session;
    const message = await Message.findById(id);
    if (!message) {
      return new Response(JSON.stringify({ error: "Message not fond" }), {
        status: 400,
      });
    }
    if (message.recipient.toString() !== userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
      });
    }
    message.read = !message.read;
    await message.save();
    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.log(error.message || error);
    return new Response(JSON.stringify(error.message || error), {
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const session = await getUserSession();
    if (!session || !session.user) {
      return new Response(JSON.stringify({ error: "You must be logged in" }), {
        status: 401,
      });
    }
    const { userId } = session;
    const message = await Message.findById(id);
    if (!message) {
      return new Response(JSON.stringify({ error: "Message not fond" }), {
        status: 400,
      });
    }
    if (message.recipient.toString() !== userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
      });
    }
    await message.deleteOne();
    return new Response("Message deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error.message || error);
    return new Response(JSON.stringify(error.message || error), {
      status: 500,
    });
  }
}
