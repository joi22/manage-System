import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContextProvider';

const SupportForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');
  const {user} = useContext(UserContext); // get userId from localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:3000/api/support/${user?._id}`, { email, message });

      setFeedback('Your support request has been sent.');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error(error);
      setFeedback('Failed to send support request.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" mx-auto p-4 ">
      <h2 className="text-xl font-bold mb-4">Contact Support</h2>

      <input
        type="email"
        placeholder="Your Email"
        className="input input-bordered border-2 border-white p-2 rounded-md w-full mb-5"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <textarea
        placeholder="Describe your issue"
        className="textarea textarea-bordered w-full mb-5 border-2 border-white p-2 "
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />

      <button type="submit" className="btn btn-primary border-1 border-[#e60076] p-3 rounded-sm w-full">Submit</button>

      {feedback && (
        <p className={`mt-2 text-sm ${feedback.includes('failed') ? 'text-red-600' : 'text-[#e60076]'}`}>
          {feedback}
        </p>
      )}
    </form>
  );
};

export default SupportForm;
