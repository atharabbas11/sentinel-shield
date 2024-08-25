import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mainimage from '../images/mainpage.png';
import backgroundImage from '../images/bg-1.png';
import aboutus from '../images/aboutus.png';
import contactus from '../images/contactus.png';
import LoadingBar from '../components/LoadingBar';
import { RiTeamLine } from "react-icons/ri";
import { IoMailOutline } from "react-icons/io5";

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

  // const handleNavigation = (path) => {
  //   navigate(path);
  //   window.scrollTo(0, 0);
  // };

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
    <div className="min-h-screen relative bg-custom-bg">
      {/* Initial image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh', // Ensure it covers the full viewport height
        }}
      ></div>

      <LoadingBar loading={loading} />

      {/* Page content */}
      <main className="relative z-10 container mx-auto mt-8 p-4">

        {/* Main Section */}
        <section className="flex flex-wrap items-center justify-center py-12 mt-10">
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
              style={{ animation: "floatEffect 6s infinite ease-in-out" }}
            />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="my-12 mt-20" ref={featuresRef}>
          <h2 className="text-5xl font-semibold text-center mb-8 text-white">Features</h2>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  ${isVisible.features ? 'fade-in' : ''}`}>
            <div class="relative group">
              <div class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
              </div>
              <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                <h3 className="text-xl font-bold mb-2 text-white">Secure Encryption</h3>
                <p className='text-white'>Encrypt your messages with advanced algorithms to ensure complete privacy and security.</p>
              </div>
            </div>

            <div class="relative group">
              <div class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
              </div>
              <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                <h3 className="text-xl font-bold mb-2 text-white">Easy-to-Use Interface</h3>
                <p className='text-white'>Our user-friendly interface makes it easy to encode and decode messages without any hassle.</p>
              </div>
            </div>

            <div class="relative group">
              <div class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
              </div>
              <div className="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                <h3 className="text-xl font-bold mb-2 text-white">Seamless Integration</h3>
                <p className='text-white'>Integrate with your favorite tools and applications to streamline your workflow.</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button onClick={() => handleClickLoading('/features')} className="px-4 py-2 m-6 bg-blue-600 text-white rounded text-base font-semibold leading-7 hover:bg-blue-700 transition">
              Learn More
            </button>
          </div>
        </section>

        <section id="aboutus" className="my-12 mt-20" ref={featuresRef}>
          {/* About Section */}
          <div className="relative">
            <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
              <div className={`my-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:px-0 ${isVisible.about ? 'slide-in-right' : ''}`}>
                <div>
                  <div className='lg:mx-auto lg:flex lg:justify-end mb-6'>
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-purple-500">
                      <RiTeamLine size={32} color='white' />
                    </span>
                  </div>
                  <div classNmae="mt-6">
                    <h2 className="xl:text-right lg:text-right md:text-left text-4xl font-semibold mb-6 text-gray-300">About Us</h2>
                    <p className="xl:text-right lg:text-right md:text-left inline-flex justify-end mt-4 text-lg text-gray-300">We are passionate about the art and science of steganography. Our mission is to provide powerful tools that help you communicate securely and privately.</p>
                    <div className="lg:mx-auto lg:flex lg:justify-end mt-6">
                    <button onClick={() => handleClickLoading('/aboutus')} className="bg-blue-600 text-white px-4 py-2 rounded text-base font-semibold leading-7 hover:bg-blue-700 transition">
                      Get Started
                    </button>
                      {/* <a className="inline-flex justify-end rounded bg-blue-600 text-white px-4 py-2 text-base font-semibold leading-7 hover:bg-blue-700 " href="/aboutus" onClick={handleClickLoding}>Learn More</a> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 sm:mt-16 lg:mt-0">
                <div className="flex justify-center mx-auto">
                  <img width="647" height="486" style={{ color: "transparent" }} src={aboutus} />
                </div>
              </div>
            </div>
          </div>
        </section>

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
                    <h2 className="text-4xl font-semibold mb-6 text-gray-300">Contact Us</h2>
                    <p className="mt-4 text-lg text-gray-300">Have questions or feedback? We'd love to hear from you. Reach out to us at{' '}
                      <a href="mailto:testingmyproject101@gmail.com" className="text-blue-600 hover:underline break-words">testingmyproject101@gmail.com</a>.
                    </p>
                    <div className="mt-6">
                      <button onClick={() => handleClickLoading('/contactus')} className="bg-blue-600 text-white px-4 py-2 rounded text-base font-semibold leading-7 hover:bg-blue-700 transition">
                        Get Started
                      </button>
                      {/* <a className="inline-flex justify-end rounded bg-blue-600 text-white px-4 py-2 text-base font-semibold leading-7 hover:bg-blue-700 " href="/contactus" onClick={handleClickLoading}>Learn More</a> */}
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
                  />
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </section>


        {/* Testimonies Section */}
        <section id="testimonies" class="py-2">
          <div class="mt-10 mb-10 max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">

            {/* Heading */}
            <div class="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
              <div class="mb-12 space-y-5 md:mb-16 md:text-center">
                <div class="inline-block px-3 py-1 text-base font-semibold text-indigo-100 rounded-lg md:text-center text-cn bg-black bg-opacity-60 hover:cursor-pointer hover:bg-opacity-40">
                  Words from Others
                </div>
                <h1 class="mb-5 text-3xl font-semibold text-white md:text-center md:text-5xl">
                  It's not just us.
                </h1>
                <p class="text-xl text-gray-100 md:text-center md:text-2xl">
                  Here's what others have to say about us.
                </p>
              </div>
            </div>

            {/* Unequal height Testimonies Cards */}
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {/* Column 1 */}
              <ul class="space-y-8">
                <li class="text-sm leading-6">
                  <div class="relative group">
                    <div class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                    </div>
                    <div class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div class="flex items-center space-x-4">
                        <img src="https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Kanye West" />
                        <div>
                          <h3 class="text-lg font-semibold text-white">Kanye West</h3>
                          <p class="text-gray-500 text-md">Rapper &amp; Entrepreneur</p>
                        </div>
                      </div>
                      <p class="leading-normal text-gray-300 text-md">Find God.</p>
                    </div>
                  </div>
                </li>

                <li class="text-sm leading-6">
                  <div class="relative group">
                    <div class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                    </div>
                    <div
                      class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div class="flex items-center space-x-4">
                        <img src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Tim Cook" />
                        <div>
                          <h3 class="text-lg font-semibold text-white">Tim Cook</h3>
                          <p class="text-gray-500 text-md">CEO of Apple</p>
                        </div>
                      </div>
                      <p class="leading-normal text-gray-300 text-md">Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum.</p>
                    </div>
                  </div>
                </li>

                <li class="text-sm leading-6">
                  <div class="relative group">
                    <div class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                    </div>
                    <div class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div class="flex items-center space-x-4"><img src="https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Kanye West" />
                        <div>
                          <h3 class="text-lg font-semibold text-white">Kanye West</h3>
                          <p class="text-gray-500 text-md">Rapper &amp; Entrepreneur</p>
                        </div>
                      </div>
                      <p class="leading-normal text-gray-300 text-md">Find God.</p>
                    </div>
                  </div>
                </li>

                <li class="text-sm leading-6">
                  <div class="relative group">
                    <div class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                    </div>
                    <div class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div class="flex items-center space-x-4">
                        <img src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Tim Cook" />
                        <div>
                          <h3 class="text-lg font-semibold text-white">Tim Cook</h3>
                          <p class="text-gray-500 text-md">CEO of Apple</p>
                        </div>
                      </div>
                      <p class="leading-normal text-gray-300 text-md">Diam quis enim lobortis scelerisquefermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittisaliquam malesuada bibendum.</p>
                    </div>
                  </div>
                </li>
              </ul>

              {/* Column 2 */}
              <ul class="hidden space-y-8 sm:block">
                <li class="text-sm leading-6">
                  <div class="relative group">
                    <div class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                    </div>
                    <div class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div class="flex items-center space-x-4">
                        <img src="https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Parag Agrawal" />
                        <div>
                          <h3 class="text-lg font-semibold text-white">Parag Agrawal</h3>
                          <p class="text-gray-500 text-md">CEO of Twitter</p>
                        </div>
                      </div>
                      <p class="leading-normal text-gray-300 text-md">Enim neque volutpat ac tincidunt vitaesemper. Mattis aliquam faucibus purus in massa tempor. Neque vitae tempus quampellentesque nec. Turpis cursus in hac habitasse platea dictumst.</p>
                    </div>
                  </div>
                </li>

                <li class="text-sm leading-6">
                  <div class="relative group">
                    <div class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                    </div>
                    <div class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div class="flex items-center space-x-4">
                        <img src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Tim Cook" />
                        <div>
                          <h3 class="text-lg font-semibold text-white">Tim Cook</h3>
                          <p class="text-gray-500 text-md">CEO of Apple</p>
                        </div>
                      </div>
                      <p class="leading-normal text-gray-300 text-md">Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum.</p>
                    </div>
                  </div>
                </li>

                <li class="text-sm leading-6">
                  <div class="relative group">
                    <div class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                    </div>
                    <div class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div class="flex items-center space-x-4">
                        <img src="https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Parag Agrawal" />
                        <div>
                          <h3 class="text-lg font-semibold text-white">Parag Agrawal</h3>
                          <p class="text-gray-500 text-md">CEO of Twitter</p>
                        </div>
                      </div>
                      <p class="leading-normal text-gray-300 text-md">Enim neque volutpat ac tincidunt vitaesemper. Mattis aliquam faucibus purus in massa tempor. Neque vitae tempus quampellentesque nec. Turpis cursus in hac habitasse platea dictumst.</p>
                    </div>
                  </div>
                </li>

                <li class="text-sm leading-6">
                  <div class="relative group">
                    <div class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                    </div>
                    <div class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div class="flex items-center space-x-4">
                        <img src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Tim Cook" />
                        <div>
                          <h3 class="text-lg font-semibold text-white">Tim Cook</h3>
                          <p class="text-gray-500 text-md">CEO of Apple</p>
                        </div>
                      </div>
                      <p class="leading-normal text-gray-300 text-md">Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum.</p>
                    </div>
                  </div>
                </li>
              </ul>

              {/* Column 3 */}
              <ul class="hidden space-y-8 lg:block">
                <li class="text-sm leading-6">
                  <div class="relative group">
                    <div class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                    </div>
                    <div class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div class="flex items-center space-x-4">
                        <img src="https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Satya Nadella" />
                        <div>
                          <h3 class="text-lg font-semibold text-white">Satya Nadella</h3>
                          <p class="text-gray-500 text-md">CEO of Microsoft</p>
                        </div>
                      </div>
                      <p class="leading-normal text-gray-300 text-md">Tortor dignissim convallis aenean ettortor at. At ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquameleifend mi. Quis ipsum suspendisse ultrices gravida dictum fusce ut.</p>
                    </div>
                  </div>
                </li>

                <li class="text-sm leading-6">
                  <div class="relative group">
                    <div class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                    </div>
                    <div class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div class="flex items-center space-x-4">
                        <img src="https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Dan Schulman" />
                        <div>
                          <h3 class="text-lg font-semibold text-white">Dan Schulman</h3>
                          <p class="text-gray-500 text-md">CEO of PayPal</p>
                        </div>
                      </div>
                      <p class="leading-normal text-gray-300 text-md">Quam pellentesque nec nam aliquam semet tortor consequat id. Enim sit amet venenatis urna cursus.</p>
                    </div>
                  </div>
                </li>

                <li class="text-sm leading-6">
                  <div class="relative group">
                    <div class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                    </div>
                    <div class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div class="flex items-center space-x-4">
                        <img src="https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Satya Nadella" />
                        <div>
                          <h3 class="text-lg font-semibold text-white">Satya Nadella</h3>
                          <p class="text-gray-500 text-md">CEO of Microsoft</p>
                        </div>
                      </div>
                      <p class="leading-normal text-gray-300 text-md">Tortor dignissim convallis aenean ettortor at. At ultrices mi tempus imperdiet nulla malesuada. Id cursus metus aliquameleifend mi. Quis ipsum suspendisse ultrices gravida dictum fusce ut.</p>
                    </div>
                  </div>
                </li>

                <li class="text-sm leading-6">
                  <div class="relative group">
                    <div class="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                    </div>
                    <div class="relative p-6 space-y-6 leading-none rounded-lg bg-slate-800 ring-1 ring-gray-900/5">
                      <div class="flex items-center space-x-4">
                        <img src="https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg" class="w-12 h-12 bg-center bg-cover border rounded-full" alt="Dan Schulman" />
                        <div>
                          <h3 class="text-lg font-semibold text-white">Dan Schulman</h3>
                          <p class="text-gray-500 text-md">CEO of PayPal</p>
                        </div>
                      </div>
                      <p class="leading-normal text-gray-300 text-md">Quam pellentesque nec nam aliquam semet tortor consequat id. Enim sit amet venenatis urna cursus.</p>
                    </div>
                  </div>
                </li>
              </ul>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
};


export default HomePage;





// previous version

{/* About Section */ }
{/* <section id="about" className="mb-10" ref={aboutRef}>
          <div className="container mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-3/5 mb-8 md:mb-0 md:pl-8 md:pr-28 lg:pl-14 xl:pl-44">
              <img src={aboutus} alt="About Us" />
            </div>
            <div className={`w-full md:w-2/5 text-center md:text-left p-2 ${isVisible.about ? 'slide-in-right' : ''}`}>
              <h2 className="text-4xl font-semibold mb-6 text-gray-300">About Us</h2>
              <p className="text-lg mb-4 xl:pr-20 text-white">
                We are passionate about the art and science of steganography. Our mission is to provide powerful tools that help you communicate securely and privately.
              </p>
              <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition" onClick={() => { navigate('/aboutus'); window.scrollTo(0, 0); }}>
                Learn More
              </button>
            </div>
          </div>
        </section> */}

{/* Contact Section */ }
{/* <section id="contact" ref={contactRef}>
          <div className="container mx-auto flex flex-col md:flex-row items-center">
            <div className={`w-full md:w-2/5 text-center md:text-right p-2 ${isVisible.contact ? 'slide-in-left' : ''}`}>
              <h2 className="text-4xl font-semibold mb-6 text-gray-300">Contact Us</h2>
              <p className="text-lg mb-4 xl:pl-20 text-white">
                Have questions or feedback? We'd love to hear from you. Reach out to us at{' '}
                <a href="mailto:testingmyproject101@gmail.com" className="text-blue-600 hover:underline break-words">testingmyproject101@gmail.com</a>.
              </p>
              <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition" onClick={() => { navigate('/contactus'); window.scrollTo(0, 0); }}>
                Learn More
              </button>
            </div>
            <div className="md:w-3/5 mb-8 md:mb-0 md:pl-8 md:pr-8 lg:pr-20 lg:pl-44">
              <img src={contactus} alt="Contact Us" />
            </div>
          </div>
        </section> */}