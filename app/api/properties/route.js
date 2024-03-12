import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async (req) => {
  try {
    await connectDB();
    const properties = await Property.find({});
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error.message || error);
    return new Response(JSON.stringify({ error: error.message || error }), { status: 500 });
  }
};
