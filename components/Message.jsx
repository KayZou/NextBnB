"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";
import { useGlobalContext } from "@/context/GlobalContext";

const Message = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [loading, setLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  // const { setUnreadCount } = useGlobalContext();

  async function handleRead(e) {
    e.preventDefault();
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });
      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);
        // setUnreadCount((prev) => (read ? prev - 1 : prev + 1));
        if (read) {
          toast.success("Marked as read");
        } else {
          toast.success("Marked as new");
        }
      }
    } catch (error) {
      console.log(error.message || error);
      toast.error(error.message || error);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        setIsDeleted(true);
        setUnreadCount((prev) => prev - 1);
        toast.success("Message deleted successfully");
      }
    } catch (error) {
      console.log(error.message || error);
      toast.error(error.message || error);
    } finally {
      setLoading(false);
    }
  }

  if (isDeleted) {
    return null;
  }

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-blue-200 text-red-500 px-2 py-1 rounded-md font-bold">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>{" "}
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.sender.username}
        </li>

        <li>
          <strong>Reply Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a href="tel:123-456-7890" className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleRead}
        className={`mt-4 mr-3 ${
          isRead ? "bg-green-500" : "bg-blue-500"
        }  text-white py-1 px-3 rounded-md`}
      >
        {isRead ? "Mark as new" : "Mark as read"}
      </button>

      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default Message;
