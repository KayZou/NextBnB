import React from "react";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  const currentDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());
  return (
    <footer className="bg-gray-200 py-4 mt-64">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <Image
            src={
              "https://png.pngtree.com/element_our/png/20181214/real-estate-house-logo-graphic-design-template-vector-illustration-png_269519.jpg"
            }
            alt="Logo"
            width={50}
            height={50}
            className="h-8 w-auto rounded-lg"
          />
        </div>
        <div className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0">
          <ul className="flex space-x-4">
            <li>
              <Link href="/properties">Properties</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Service</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            &copy; {currentDate} NextBnB. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
