"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
import PropertyHeader from "@/components/PropertyHeader";
import { fetchProperty } from "@/utils/requests";
import Link from "next/link";
import PropertyDetails from "@/components/PropertyDetails";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Spinner from "@/components/Spinner";
import PropertyImages from "@/components/PropertyImages";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";

const Property = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPropertyData() {
      if (!id) return;
      try {
        const fetchedProperty = await fetchProperty(id);
        setProperty(fetchedProperty);
      } catch (error) {
        console.log(error.message || error);
      } finally {
        setLoading(false);
      }
    }

    if (!property) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!loading && !property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10 text-red-600">
        Property Not Found!
      </h1>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {property && <PropertyHeader image={property.images[0]} />}

      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowAltCircleLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            {property && <PropertyDetails property={property} />}

            {/* <!-- Sidebar --> */}
            {property && (
              <aside className="space-y-4">
                <BookmarkButton property={property} />
                <ShareButtons property={property} />
                <PropertyContactForm property={property} />
              </aside>
            )}
          </div>
        </div>
      </section>
      {property && property.images && (
        <PropertyImages images={property.images} />
      )}
    </>
  );
};

export default Property;
