"use client";
import React, { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
const SavedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookedProperties() {
      try {
        const res = await fetch("/api/bookmarks");
        if (!res.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.log(error.message || error);
        toast.error("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    }
    fetchBookedProperties();
  }, []);

  if (loading) return <Spinner loading={loading} />;
  if (properties.length === 0)
    return (
      <p className="text-3xl text-center font-bold text-red-500 mt-4">
        No properties are bookmarked
      </p>
    );
  return (
    <section className="px-4 py-6">
      <h1 className="text-3xl font-bold mb-4 text-center ">
        Saved Properties:
      </h1>
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p className="text-3xl text-center font-bold text-red-500">
            No properties found
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedProperties;
