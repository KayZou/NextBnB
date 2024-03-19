"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";

const page = () => {
  const { data: session } = useSession();
  const profileImage = session?.user.image;
  const name = session?.user.name;
  const email = session?.user.email;

  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserProperties(userId) {
      if (!userId) return;
      try {
        const res = await fetch(`/api/properties/user/${userId}`);
        if (!res.ok) {
          console.log("Can't fetch properties for this user!");
          return;
        }
        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.log(error.message || error);
      } finally {
        setIsLoading(false);
      }
    }
    if (session.user.id) {
      fetchUserProperties(session.user.id);
    }
  }, [session]);

  async function handleDelete(id) {
    const confirmed = window.confirm("Are you sure of deleting the property?");
    if (!confirmed) return;
    try {
      setIsLoading(true);
      const res = await fetch(`/api/properties/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete property");
      }
      const data = await res.json();
      setProperties((prevProperties) => {
        return prevProperties.filter((property) => property._id !== id);
      });
      toast.success("Property deleted successfully");
    } catch (error) {
      console.log(error.message || error);
      toast.error("Failed to delete property");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={
                    profileImage
                      ? profileImage
                      : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                  }
                  alt="User"
                  width={200}
                  height={200}
                  priority={true}
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span> {name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span> {email}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              <div className="mb-10">
                {!isLoading && properties.length === 0 && (
                  <p className="text-lg font-semibold text-center text-red-500">
                    No properties found.
                  </p>
                )}
                {isLoading ? (
                  <Spinner loading={isLoading} />
                ) : (
                  properties.map((property) => (
                    <div key={property._id} className="mb-10">
                      <Link href={`/properties/${property._id}`}>
                        <Image
                          className="h-32 w-full rounded-md object-cover"
                          src={property.images[0]}
                          alt="Property 2"
                          width={1800}
                          height={400}
                          priority={true}
                        />
                      </Link>
                      <div className="mt-2">
                        <p className="text-lg font-semibold">
                          {property.name || property}
                        </p>
                        <p className="text-gray-600">
                          Address: {property.location.city},{" "}
                          {property.location.street}
                        </p>
                      </div>
                      <div className="mt-2">
                        <Link
                          href={`/properties/${property._id}/edit`}
                          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                        >
                          Edit
                        </Link>
                        {isLoading ? (
                          <Spinner loading={isLoading} />
                        ) : (
                          <button
                            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                            type="button"
                            onClick={() => handleDelete(property._id)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
