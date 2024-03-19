import connectDB from "@/config/database";
import mongoose from "mongoose";
import Property from "@/models/Property";
import { getUserSession } from "@/utils/getUserSession";

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

export const DELETE = async (req, { params }) => {
  try {
    const sessionUser = await getUserSession();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User id invalid", { status: 401 });
    }
    await connectDB();
    const { userId } = sessionUser;
    const propertyId = params.id;
    const properties = await Property.findById(propertyId);
    if (!properties) return new Response("Property not found", { status: 404 });
    if (properties.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 404 });
    }
    await properties.deleteOne();
    return new Response(JSON.stringify({ message: "Property deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error.message || error);
    return new Response(JSON.stringify({ error: error.message || error }), {
      status: 500,
    });
  }
};

export const PUT = async (req, { params }) => {
  try {
    await connectDB();
    const userSession = await getUserSession();
    // console.log(userSession);
    if (!userSession || !userSession.userId) {
      return new Response(
        JSON.stringify({ message: "Unauthorized" }, { status: "401" })
      );
    }
    const { userId } = userSession;
    const { id } = params;
    const formData = await req.formData();
    const amenities = formData.getAll("amenities");

    const property = await Property.findById(id);
    if (!property)
      return new Response("Property doesn't exist", { status: 404 });

    if (property.owner.toString() !== userId)
      return new Response("Unauthorized", {
        status: 401,
      });

    const createdProperty = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        zipcode: formData.get("location.zipcode"),
        state: formData.get("location.state"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        nightly: formData.get("rates.nightly"),
        monthly: formData.get("rates.monthly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };
    console.log(createdProperty);
    const savedProperty = await Property.findByIdAndUpdate(id, createdProperty);
    return new Response(JSON.stringify({ savedProperty }, { status: 200 }));
  } catch (error) {
    console.log(error.message || error);
    return new Response(JSON.stringify({ error: error.message || error }), {
      status: 500,
    });
  }
};
