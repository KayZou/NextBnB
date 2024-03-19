"use client";
import React, { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import { setDefaults, fromAddress } from "react-geocode";
import Spinner from "./Spinner";
import Image from "next/image";
import { FaMapPin } from "react-icons/fa";

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);
  setDefaults({
    language: "en",
    region: "ma",
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
  });

  useEffect(() => {
    async function fetchCords() {
      const cords = await fromAddress(
        `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
      );
      const { lat, lng } = cords.results[0].geometry.location;
      console.log(lat, lng);
      setLat(lat);
      setLng(lng);
      setViewport({
        ...viewport,
        latitude: lat,
        longitude: lng,
      });
      setLoading(false);
    }
    fetchCords();
  }, []);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{ longitude: lng, latitude: lat, zoom: 15 }}
        style={{ width: "100%", height: 500 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <FaMapPin size={32} color="black" />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
