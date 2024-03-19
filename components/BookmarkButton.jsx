"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookmark() {
    //   if (!userId) return;
      try {
        const res = await fetch("/api/bookmarks/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ propertyId: property._id }),
        });
        if (res.status === 200) {
          const data = await res.json();
          setIsBookmarked(data.isBooked);
        }
      } catch (error) {
        console.log(error.message || error);
      } finally {
        setLoading(false);
      }
    }
    fetchBookmark();
  }, [property._id, userId]);

  async function handleClick() {
    if (!userId) {
      toast.error("You must be logged in to bookmark properties");
      return;
    }
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, propertyId: property._id }),
      });
      if (res.status === 200) {
        const data = await res.json();
        toast.success(data.message);
        setIsBookmarked(data.isBooked);
      }
    } catch (error) {
      console.log(error.message || error);
      toast.error(error.message || error);
    }
  }
  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }
  return (
    <button
      onClick={handleClick}
      className={`${
        isBookmarked
          ? "bg-red-500 hover:bg-red-600"
          : "bg-blue-500 hover:bg-blue-600"
      } text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
    >
      <FaBookmark className="mr-2" />{" "}
      {isBookmarked ? "Remove Bookmark" : "Bookmark Property"}
    </button>
  );
};

export default BookmarkButton;
