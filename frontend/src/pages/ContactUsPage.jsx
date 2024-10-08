// src/pages/ContactUsPage.js

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import backgroundImage1 from '../images/doted6.png'
import contactus from '../images/contactus.png'; 
import LoadingBar from '../components/LoadingBar';
import { IoMailOutline } from "react-icons/io5";

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ContactUsPage = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Intersection Observer setup
  const [isVisible, setIsVisible] = useState({
    contact: false
  });

  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const featuresElement = featuresRef.current;
    const aboutElement = aboutRef.current;
    const contactElement = contactRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (featuresElement) observer.observe(featuresElement);
    if (aboutElement) observer.observe(aboutElement);
    if (contactElement) observer.observe(contactElement);

    return () => {
      if (featuresElement) observer.unobserve(featuresElement);
      if (aboutElement) observer.unobserve(aboutElement);
      if (contactElement) observer.unobserve(contactElement);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      console.log(`Sending request to: ${apiUrl}/api/contact`);
      const response = await axios.post(`${apiUrl}/api/contact`, formData);

      console.log(`Response Status: ${response.status}`); // Check status code
      console.log(`Response Data: ${JSON.stringify(response.data)}`); // Check response data

      // if (response.status === 201) {
      //   setSuccessMessage('Message sent successfully!');
      //   setFormData({ name: '', email: '', message: '' });
      // } else {
      //   setErrorMessage('Failed to send message');
      // }
      if (response.status === 201) {
        setSuccessMessage('🎉 Hooray! Your message has been sent successfully. We’ll get back to you soon!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setErrorMessage('🚨 Oops! Something went wrong while sending your message. Please try again later.');
      }

    } catch (error) {
      console.error('Error:', error); // Log the complete error
      setErrorMessage('An error occurred: ' + (error.response?.data?.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-custom-bg">
      <section style={{ backgroundImage: `url(${backgroundImage1})`, backgroundSize: 'auto', backgroundPosition: 'bottom', backgroundRepeat: 'repeat' }}>
        <main className="relative z-10 container mx-auto mt-8 p-4">
          <LoadingBar loading={loading} />
          <section id="contactus" className="my-12 mt-20" ref={featuresRef}>
            {/* Contact Section */}
            <div className="relative">
              <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
                <div className={`my-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:px-0 lg:col-start-2 ${isVisible.about ? 'slide-in-right' : ''}`}>
                  <div>
                    <div>
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-purple-500">
                        <IoMailOutline size={32} color='white' />
                      </span>
                    </div>

                    <div className="mt-6">
                      <h2 className="text-4xl font-semibold mb-6 text-white">Contact Us</h2>
                      <p className="mt-4 text-lg text-gray-300">Have questions or feedback? We'd love to hear from you. Reach out to us at{' '}
                        <a href="mailto:testingmyproject101@gmail.com" className="text-blue-600 hover:underline break-words">testingmyproject101@gmail.com</a>.
                      </p>
                      <div className="mt-6">
                        <button className="inline-flex justify-end rounded bg-blue-600 text-white px-4 py-2 text-base font-semibold leading-7 hover:bg-blue-700 " href="#">Learn More</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 sm:mt-16 lg:mt-0">
                  <div className="flex justify-center mx-auto">
                    <img
                      width="647" height="486"
                      style={{ color: "transparent" }}
                      src={contactus}
                      alt='contactusimg'
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="body-font relative text-gray-400">
            <div className="container mx-auto py-24">
              <div className="mb-12 flex w-full flex-col text-center">
                <h1 className='font-bold lg:text-7xl text-4xl text-white mb-6'>Got questions? <br /> We'll answer.</h1>
                <p className="mx-auto text-base leading-relaxed lg:w-2/3 text-white">
                  Feel free to reach out to us! Whether you have a question, feedback, or a collaboration proposal, we'd love to hear from you.
                </p>
              </div>

              <div className="mx-auto md:w-2/3 lg:w-1/2 bg-gray-900 opacity-90 rounded-md">
                {successMessage && (
                  <div className="mb-4 p-4 bg-green-500 text-white rounded">
                    {successMessage}
                  </div>
                )}
                {errorMessage && (
                  <div className="mb-4 p-4 bg-red-500 text-white rounded">
                    {errorMessage}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-wrap rounded border border-none p-4">
                  <div className="w-full p-2 mb-5">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="peer w-full rounded border border-gray-700 bg-gray-800 bg-opacity-40 py-2 px-3 text-gray-100 placeholder-gray-400 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-500"
                      placeholder="Name"
                      required
                    />
                  </div>

                  <div className="w-full p-2 mb-5">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="peer w-full rounded border border-gray-700 bg-gray-800 bg-opacity-40 py-2 px-3 text-gray-100 placeholder-gray-400 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-500"
                      placeholder="Email"
                      required
                    />
                  </div>

                  <div className="w-full p-2 mb-5">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="peer h-32 w-full resize-none rounded border border-gray-700 bg-gray-800 bg-opacity-40 py-2 px-3 text-gray-100 placeholder-gray-400 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-500"
                      placeholder="Message"
                      required
                    ></textarea>
                  </div>

                  <div className="w-full p-2 mb-3">
                    <button type="submit" className="mx-auto flex rounded border-0 bg-indigo-500 py-2 px-8 text-lg text-white hover:bg-indigo-600 focus:outline-none">
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </main>
      </section>
    </div>
  );
};

export default ContactUsPage;
