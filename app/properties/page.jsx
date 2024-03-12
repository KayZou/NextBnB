import React from "react";
import Link from "next/link";
// import properties from "@/properties.json";
import PropertyCard from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/requests";

const Properties = async () => {
  const properties = await fetchProperties();

  //set properties by date
  properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <section class="px-4 py-6">
      <div class="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Properties;
