"use client";
import React from "react";
import { useParams } from "next/navigation";
const Property = () => {
  const { id } = useParams();
  return <div>Property page dyal; {id}</div>;
};

export default Property;
