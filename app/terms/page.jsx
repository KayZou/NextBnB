// pages/terms-of-use.js

import React from "react";

const TermsOfUsePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p>
          By accessing or using NextBnB, you agree to these Terms of Use and our
          Privacy Policy. If you do not agree, please discontinue use of the
          service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
        <p>
          To access certain features of NextBnB, you may be required to create a
          user account. You are responsible for maintaining the confidentiality
          of your account information and agree to accept responsibility for all
          activities that occur under your account.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Property Listings</h2>
        <p>
          Users can publish and manage property listings on NextBnB. By
          submitting a listing, you confirm that you have the right to do so,
          and the information provided is accurate.
        </p>
      </section>

      {/* ... Add more sections as needed ... */}

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Contact Information</h2>
        <p>
          If you have any questions or concerns about these Terms of Use, please
          contact us at{" "}
          <a href="mailto:elghazaliziko@gmail.com" className="text-blue-500">
            your-email@example.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default TermsOfUsePage;
