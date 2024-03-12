import connectDB from "@/config/database";
import mongoose from "mongoose";
import Property from "@/models/Property";

export const GET = async (req, { params }) => {
  try {
    await connectDB();

    const property = await Property.find({ _id: params.id });
    // console.log(property);
    if (!property) {
      return new Response("Can't Find The Property", { status: 404 });
    }

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.log(error.message || error);
    return new Response(JSON.stringify({ error: error.message || error }), {
      status: 500,
    });
  }
};
