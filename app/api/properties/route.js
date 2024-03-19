import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getUserSession } from "@/utils/getUserSession";
import cloudinary from "@/config/cloudinary";

export const GET = async (req) => {
  try {
    await connectDB();
    const properties = await Property.find({});
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error.message || error);
    return new Response(JSON.stringify({ error: error.message || error }), {
      status: 500,
    });
  }
};

export const POST = async (req) => {
  try {
    await connectDB();
    const userSession = await getUserSession();
    console.log(userSession);
    if (!userSession || !userSession.userId) {
      return new Response(
        JSON.stringify({ message: "Unauthorized" }, { status: "401" })
      );
    }
    const { userId } = userSession;
    const formData = await req.formData();
    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");
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
    const imageUploadPromise = [];
    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);
      const imageBase64 = imageData.toString("base64");
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: "nextbnb" }
      );
      imageUploadPromise.push(result.secure_url);
      const uploadedImages = await Promise.all(imageUploadPromise);
      createdProperty.images = uploadedImages;
    }
    console.log(createdProperty);
    const savedProperty = await Property.create(createdProperty);
    // return new Response(JSON.stringify({ savedProperty }, { status: 200 }));
    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${savedProperty._id}`
    );
  } catch (error) {
    console.log(error.message || error);
    return new Response(JSON.stringify({ error: error.message || error }), {
      status: 500,
    });
  }
};


