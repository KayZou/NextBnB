"use client";
import React, { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PropertySearchForm from "@/components/PropertySearchForm";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get("location");
  const type = searchParams.get("type");

  useEffect(() => {
    async function fetchSearch() {
      try {
        const response = await fetch(
          `/api/properties/search?location=${location}&type=${type}`
        );
        if (response.status === 200) {
          const data = await response.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.log(error.message || error);
      } finally {
        setLoading(false);
      }
    }
    fetchSearch();
  }, [location, type]);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <Link
              href="/properties"
              className="text-blue-500 hover:text-blue-700 flex items-center mb-3"
            >
              <FaArrowAltCircleLeft className="text-xl mr-2" />
              Go Back To Properties
            </Link>
            <h1 className="text-2xl text-center mb-4">Search Results</h1>
            {properties.length === 0 ? (
              <p className="text-3xl text-center font-bold text-red-500">
                No Search Results Found
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
      )}
      ;
    </>
  );
};

export default SearchResults;
