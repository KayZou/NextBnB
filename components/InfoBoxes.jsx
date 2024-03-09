import React from "react";
import InfoBox from "./InfoBox";
const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="For landlords"
            backgroundColor="bg-blue-100"
            buttonInfo={{
              text: "Publish Properties",
              link: "/properties/add",
              backgroundColor: "bg-blue-500",
              textColor: "text-black",
            }}
          >
            Share your place for renting, easily reach interested customers!
          </InfoBox>
          <InfoBox
            heading="For customers"
            backgroundColor="bg-gray-100"
            buttonInfo={{
              text: "Browse Properties",
              link: "/properties",
              backgroundColor: "bg-black",
              textColor: "text-white",
            }}
          >
            Rent the best place with an amazing view, reach out to renters with
            the suited property for your next holiday!
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
