import { Schema, model, models } from "mongoose";

const PropertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    location: {
      street: String,
      city: String,
      state: String,
      zipcode: String,
    },
    beds: {
      type: Number,
    },
    baths: {
      type: Number,
    },
    square_feet: {
      type: Number,
    },
    amenities: [
      {
        type: String,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    rates: {
      weekly: {
        type: Number,
      },
      monthly: {
        type: Number,
      },
      nightly: {
        type: Number,
      },
    },
    seller_info: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Property = models.Property || model("Property", PropertySchema);

export default Property;
