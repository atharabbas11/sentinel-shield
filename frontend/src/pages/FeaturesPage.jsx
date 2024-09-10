// src/pages/FeaturesPage.js
import React from 'react';
import backgroundImage from '../images/bg-1.png'; 
import feature1 from '../images/feature-1.jpg';
import feature2 from '../images/feature-2.jpg';
import feature3 from '../images/feature-3.jpg';
import { IoLockClosedOutline } from "react-icons/io5";
import { VscSymbolInterface } from "react-icons/vsc";
import { FcDataProtection } from "react-icons/fc";


const FeaturesPage = () => {
  return (
    <div className="min-h-screen relative bg-custom-bg">
      <section style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'bottom', }}>
        <main className="relative z-10 container mx-auto mt-8 p-4">
          <div className="relative overflow-hidden mt-20 pb-32 space-y-24">
            <h1 className="text-5xl font-semibold text-center mb-8 text-white">Features</h1>
            {/* First Section */}
            <div className="relative">
              <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
                <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
                  <div>
                    <div>
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-purple-500">
                        <IoLockClosedOutline size={32} color='white' />
                      </span>
                    </div>
                    <div className="mt-6">
                      <h2 className="text-3xl font-bold tracking-tight text-white">Secure Encryption :</h2>
                      <p className="mt-4 text-lg text-gray-300">Encrypt your messages with advanced algorithms to ensure complete privacy and security.</p>
                      <div className="mt-6">
                        <button className="inline-flex justify-end rounded bg-blue-600 text-white px-4 py-2 text-base font-semibold leading-7 hover:bg-blue-700 " href="#">Learn More</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 sm:mt-16 lg:mt-0">
                  <div className="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                    <img
                      width="647" height="486"
                      style={{ color: "transparent" }}
                      className="w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src={feature1}
                      alt='feature1'
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Second Section */}
            <div className="relative">
              <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
                <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 lg:col-start-2">
                  <div>
                    <div>
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-purple-500">
                        <VscSymbolInterface size={32} color='white' />
                      </span>
                    </div>

                    <div className="mt-6">
                      <h2 className="text-3xl font-bold tracking-tight text-white">Easy-to-Use Interface :</h2>
                      <p className="mt-4 text-lg text-gray-300">Our user-friendly interface makes it easy to encode and decode messages without any hassle.</p>
                      <div className="mt-6">
                        <button className="inline-flex justify-end rounded bg-blue-600 text-white px-4 py-2 text-base font-semibold leading-7 hover:bg-blue-700 " href="#">Learn More</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 sm:mt-16 lg:mt-0">
                  <div className="-ml-48 pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                    <img
                      width="647" height="486"
                      style={{ color: "transparent" }}
                      className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                      src={feature2}
                      alt='feature2'
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Third Section */}
            <div className="relative">
              <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
                <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
                  <div>
                    <div>
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-purple-500">
                        <FcDataProtection size={32} color='white' />
                      </span>
                    </div>

                    <div className="mt-6">
                      <h2 className="text-3xl font-bold tracking-tight text-white"> Protected Authentication :</h2>
                      <p className="mt-4 text-lg text-gray-300"> ensures that user identities are verified through secure methods, safeguarding sensitive information and preventing unauthorized access.</p>
                      <div className="mt-6">
                        <button className="inline-flex justify-end rounded bg-blue-600 text-white px-4 py-2 text-base font-semibold leading-7 hover:bg-blue-700 " href="#">Learn More</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 sm:mt-16 lg:mt-0">
                  <div className="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                    <img
                      width="647" height="486"
                      style={{ color: "transparent" }}
                      className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src={feature3}
                      alt='feature3'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default FeaturesPage;
