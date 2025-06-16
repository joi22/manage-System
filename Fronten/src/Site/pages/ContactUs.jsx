import React from "react";
import SupportForm from "./SupportForm";

const ContactUs = () => {
  return (
    <div className="min-h-screen  py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto  p-8 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center  mb-4">Contact Us</h1>
        <p className="text-center  mb-8">
          Have a question, need help, or want to share feedback? Fill out the form below and our support team will get back to you as soon as possible.
        </p>

        <SupportForm />
      </div>
    </div>
  );
};

export default ContactUs;
