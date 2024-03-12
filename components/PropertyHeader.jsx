import React from "react";
import Image from "next/image";
const PropertyHeader = ({ image }) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={image}
            alt=""
            height={0}
            className="object-cover h-[400px] w-full"
            width="1800"
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeader;
