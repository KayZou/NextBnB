import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const userId = params.userId;
    if (!userId) {
      return new Response("Invalid user id!", { status: 400 });
    }
    const properties = await Property.find({ owner: userId });
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error.message || error);
    return new Response(JSON.stringify({ error: error.message || error }), {
      status: 500,
    });
  }
};
