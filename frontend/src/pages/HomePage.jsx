import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mainimage from '../images/mainpage.png';
import backgroundImage from '../images/bg-1.png';
import backgroundImage1 from '../images/doted6.png';
import aboutus from '../images/aboutus.png';
import contactus from '../images/contactus.png';
import LoadingBar from '../components/LoadingBar';
import { RiTeamLine } from "react-icons/ri";
import { IoMailOutline } from "react-icons/io5";

import feature1 from '../images/feature-1.jpg';
import feature2 from '../images/feature-2.jpg';
import feature3 from '../images/feature-3.jpg';

import { IoLockClosedOutline } from "react-icons/io5";
import { VscSymbolInterface } from "react-icons/vsc";
import { FcDataProtection } from "react-icons/fc";

const HomePage = ({ isLoggedIn }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      if (isLoggedIn) {
        navigate('/steganography');
        window.scrollTo(0, 0);
      } else {
        navigate('/login');
        window.scrollTo(0, 0);
      }
      setLoading(false); // Hide the loading bar after navigation
    }, 300); // Adjust the delay to match the desired loading duration
  };

  const handleClickLoading = (href) => {
    setLoading(true);
    setTimeout(() => {
      if (isLoggedIn) { // Assume isLoggedIn is a function that checks if the user is logged in
        navigate(href);
      } else {
        navigate(href);
      }
      window.scrollTo(0, 0);
      setLoading(false);
    }, 300); // Adjust the delay to match the desired loading duration
  };

  // Intersection Observer setup 
  const [isVisible, setIsVisible] = useState({
    features: false,
    about: false,
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

  return (
    <div className="relative bg-custom-bg">
      <LoadingBar loading={loading} />

      {/* Page content */}
      <main className="relative z-10 mx-auto mt-8">

        {/* Main Section */}
        <section style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'bottom', }}>
          <div className='p-4'>
            <section className="flex flex-wrap items-center justify-center pt-24 mt-10 container mx-auto">
              <div className="w-full lg:w-2/5 text-center md:text-left px-4 p-4">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                  Unveil Hidden{' '}
                  <span className="text-red-500 text-3xl md:text-5xl">&lt;</span>
                  <span className="text-4xl md:text-6xl text-white">Messages</span> /
                  <span className="text-red-500 text-3xl md:text-5xl">&gt;</span>
                </h2>
                <p className="text-lg mb-6 font-sans font-semibold text-white">
                  Explore the world of steganography with our intuitive application that allows you to hide and reveal messages within images securely.
                </p>
                <button onClick={handleClick} className="bg-blue-600 text-white px-4 py-2 rounded text-base font-semibold leading-7 hover:bg-blue-700 transition">
                  Get Started
                </button>
              </div>
              <div className="w-full lg:w-3/5 flex justify-center">
                <img
                  src={mainimage}
                  alt="Main"
                  className="max-w-full h-auto animate-floatEffect m-10"
                // style={{ animation: "floatEffect 6s infinite ease-in-out" }}
                />
              </div>
            </section>
          </div>
          {/* </section> */}

          {/* Features Section */}
          <div className='mt-5 p-4'>
            <section id="features" className="flex flex-wrap items-center justify-center container mx-auto my-12" ref={featuresRef}>
              <h2 className="text-5xl font-semibold text-center mb-8 text-white">Features</h2>
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${isVisible.features ? 'fade-in' : ''}`}>
                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                  </div>
                  <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                    <div className='mx-auto flex justify-start gap-2 lg:flex lg:justify-start'>
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-purple-500">
                        <IoLockClosedOutline size={32} color='white' />
                      </span>
                      <h3 className="text-xl font-bold m-2 text-white">Secure Encryption</h3>
                    </div>
                    <img
                      style={{ color: "transparent" }}
                      className="w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 h-56"
                      src={feature2}
                      alt='feature2'
                    />
                    <p className='text-gray-300 font-sans text-base'>Secure your messages with cutting-edge encryption algorithms. Our technology guarantees complete privacy and protection, ensuring your communications remain confidential and shielded from unauthorized access for maximum security.</p>
                  </div>
                </div>


                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                  </div>
                  <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                    <div className='mx-auto flex justify-start gap-2 lg:flex lg:justify-start'>
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-purple-500">
                        <VscSymbolInterface size={32} color='white' />
                      </span>
                      <h3 className="text-xl m-2 font-bold text-white">Easy-to-Use Interface</h3>
                    </div>
                    <img
                      style={{ color: "transparent" }}
                      className="w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 h-56"
                      src={feature2}
                      alt='feature2'
                    />
                    <p className='text-gray-300 font-sans text-base'>Our intuitive interface simplifies encoding and decoding messages, making the process effortless and straightforward. Experience a seamless way to secure your messages without hassle or complexity in managing your encryption needs.</p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                  </div>
                  <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                    <div className='mx-auto flex justify-start gap-2 lg:flex lg:justify-start'>
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-purple-500">
                        <FcDataProtection size={32} color='white' />
                      </span>
                      <h3 className="text-xl m-2 font-bold text-white">Seamless Integration</h3>
                    </div>
                    <img
                      style={{ color: "transparent" }}
                      className="w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 h-56"
                      src={feature3}
                      alt='feature3'
                    />
                    <p className='text-gray-300 font-sans text-base'>Integrate effortlessly with your favorite tools to streamline your workflow. Our solution ensures smooth connectivity, enabling efficient task management and boosting productivity without disrupting your existing systems or processes.</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button onClick={() => handleClickLoading('/features')} className="px-4 py-2 m-6 bg-blue-600 text-white rounded text-base font-semibold leading-7 hover:bg-blue-700 transition">
                  Learn More
                </button>
              </div>
            </section>
          </div>
        </section >

  <section style={{ backgroundImage: `url(${backgroundImage1})`, backgroundSize: 'auto', backgroundPosition: 'bottom', backgroundRepeat: 'repeat' }}>
    <section id="aboutus" className="container mx-auto my-12" ref={featuresRef}>
      {/* About Section */}
      <div className="relative p-5">
        <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
          <div className={`my-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:px-0 ${isVisible.about ? 'slide-in-right' : ''}`}>
            <div>
              <div className='lg:mx-auto lg:flex lg:justify-end mb-6'>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-purple-500">
                  <RiTeamLine size={32} color='white' />
                </span>
              </div>
              <div className="mt-6">
                <h2 className="xl:text-right lg:text-right md:text-left text-4xl font-semibold mb-6 text-white">About Us</h2>
                <p className="xl:text-right lg:text-right md:text-left inline-flex justify-end mt-4 text-lg text-gray-300">We are passionate about the art and science of steganography. Our mission is to provide powerful tools that help you communicate securely and privately.</p>
                <div className="lg:mx-auto lg:flex lg:justify-end mt-6">
                  <button onClick={() => handleClickLoading('/aboutus')} className="bg-blue-600 text-white px-4 py-2 rounded text-base font-semibold leading-7 hover:bg-blue-700 transition">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 lg:mt-0">
            <div className="flex justify-center mx-auto">
              <img width="647" height="486" style={{ color: "transparent" }} src={aboutus} alt='aboutus' />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contactus" className="container mx-auto my-12" ref={featuresRef}>
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
                  <button onClick={() => handleClickLoading('/contactus')} className="bg-blue-600 text-white px-4 py-2 rounded text-base font-semibold leading-7 hover:bg-blue-700 transition">
                    Learn More
                  </button>
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
                alt='contactus'
              />
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  </section>

{/* Testimonies Section */ }
<section id="testimonies" className=" py-2">
  <div className="relative w-full h-[200px] overflow-hidden">
    <div className="dome-container">
      <div className="dome">
        <div className="content-wrapper">
          <div className="space-y-5 md:text-center">
            <div className="inline-block px-3 py-1 text-base font-semibold text-indigo-100 rounded-lg md:text-center text-cn bg-black bg-opacity-60 hover:cursor-pointer hover:bg-opacity-40">
              Words from Others
            </div>
            <h1 className="mb-5 text-3xl font-semibold text-white md:text-center md:text-5xl">
              It's not just us.
            </h1>
            <p className="text-xl text-gray-100 md:text-center md:text-2xl">
              Here's what others have to say about us.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section id="testimonies" className="container mx-auto py-2">
    <div className="mt-10 mb-10 max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
      {/* Unequal height Testimonies Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {/* Column 1 */}
        <ul className="space-y-8">
          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
              </div>
              <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                <div className="flex items-center space-x-4">
                  <img src="https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Kanye West" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Kanye West</h3>
                    <p className="text-gray-500 text-md">Rapper &amp; Entrepreneur</p>
                  </div>
                </div>
                <p className="leading-normal text-gray-300 text-md">Find God.</p>
              </div>
            </div>
          </li>

          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
              </div>
              <div
                className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                <div className="flex items-center space-x-4">
                  <img src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Tim Cook" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Tim Cook</h3>
                    <p className="text-gray-500 text-md">CEO of Apple</p>
                  </div>
                </div>
                <p className="leading-normal text-gray-300 text-md">Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum.</p>
              </div>
            </div>
          </li>

          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
              </div>
              <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                <div className="flex items-center space-x-4"><img src="https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Kanye West" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Kanye West</h3>
                    <p className="text-gray-500 text-md">Rapper &amp; Entrepreneur</p>
                  </div>
                </div>
                <p className="leading-normal text-gray-300 text-md">Find God.</p>
              </div>
            </div>
          </li>

          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
              </div>
              <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                <div className="flex items-center space-x-4">
                  <img src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Tim Cook" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Tim Cook</h3>
                    <p className="text-gray-500 text-md">CEO of Apple</p>
                  </div>
                </div>
                <p className="leading-normal text-gray-300 text-md">Diam quis enim lobortis scelerisquefermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittisaliquam malesuada bibendum.</p>
              </div>
            </div>
          </li>
        </ul>

        {/* Column 2 */}
        <ul className="hidden space-y-8 sm:block">
          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
              </div>
              <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                <div className="flex items-center space-x-4">
                  <img src="https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Parag Agrawal" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Parag Agrawal</h3>
                    <p className="text-gray-500 text-md">CEO of Twitter</p>
                  </div>
                </div>
                <p className="leading-normal text-gray-300 text-md">Enim neque volutpat ac tincidunt vitaesemper. Mattis aliquam faucibus purus in massa tempor. Neque vitae tempus quampellentesque nec. Turpis cursus in hac habitasse platea dictumst.</p>
              </div>
            </div>
          </li>

          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
              </div>
              <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                <div className="flex items-center space-x-4">
                  <img src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Tim Cook" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Tim Cook</h3>
                    <p className="text-gray-500 text-md">CEO of Apple</p>
                  </div>
                </div>
                <p className="leading-normal text-gray-300 text-md">Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum.</p>
              </div>
            </div>
          </li>

          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
              </div>
              <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                <div className="flex items-center space-x-4">
                  <img src="https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Parag Agrawal" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Parag Agrawal</h3>
                    <p className="text-gray-500 text-md">CEO of Twitter</p>
                  </div>
                </div>
                <p className="leading-normal text-gray-300 text-md">Enim neque volutpat ac tincidunt vitaesemper. Mattis aliquam faucibus purus in massa tempor. Neque vitae tempus quampellentesque nec. Turpis cursus in hac habitasse platea dictumst.</p>
              </div>
            </div>
          </li>

          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
              </div>
              <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                <div className="flex items-center space-x-4">
                  <img src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Tim Cook" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Tim Cook</h3>
                    <p className="text-gray-500 text-md">CEO of Apple</p>
                  </div>
                </div>
                <p className="leading-normal text-gray-300 text-md">Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum.</p>
              </div>
            </div>
          </li>
        </ul>

        {/* Column 3 */}
        <ul className="hidden space-y-8 lg:block">
          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
              </div>
              <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                <div className="flex items-center space-x-4">
                  <img src="https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Satya Nadella" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Satya Nadella</h3>
                    <p className="text-gray-500 text-md">CEO of Microsoft</p>
                  </div>
                </div>
                <p className="leading-normal text-gray-300 text-md">Tortor dignissim convallis aenean ettortor at. At ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquameleifend mi. Quis ipsum suspendisse ultrices gravida dictum fusce ut.</p>
              </div>
            </div>
          </li>

          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
              </div>
              <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                <div className="flex items-center space-x-4">
                  <img src="https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Dan Schulman" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Dan Schulman</h3>
                    <p className="text-gray-500 text-md">CEO of PayPal</p>
                  </div>
                </div>
                <p className="leading-normal text-gray-300 text-md">Quam pellentesque nec nam aliquam semet tortor consequat id. Enim sit amet venenatis urna cursus.</p>
              </div>
            </div>
          </li>

          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
              </div>
              <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                <div className="flex items-center space-x-4">
                  <img src="https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Satya Nadella" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Satya Nadella</h3>
                    <p className="text-gray-500 text-md">CEO of Microsoft</p>
                  </div>
                </div>
                <p className="leading-normal text-gray-300 text-md">Tortor dignissim convallis aenean ettortor at. At ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquameleifend mi. Quis ipsum suspendisse ultrices gravida dictum fusce ut.</p>
              </div>
            </div>
          </li>

          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
              </div>
              <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                <div className="flex items-center space-x-4">
                  <img src="https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Dan Schulman" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Dan Schulman</h3>
                    <p className="text-gray-500 text-md">CEO of PayPal</p>
                  </div>
                </div>
                <p className="leading-normal text-gray-300 text-md">Quam pellentesque nec nam aliquam semet tortor consequat id. Enim sit amet venenatis urna cursus.</p>
              </div>
            </div>
          </li>
        </ul>

      </div>
    </div>
  </section>
</section>
      </main >
    </div >
  );
};


export default HomePage;
