// Footer.js
import React from 'react';
import { FaTwitter, FaFacebook, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 flex flex-wrap md:flex-no-wrap justify-between items-center border-t-2 border-gray-700">
          <div className="flex flex-wrap justify-center md:justify-start gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <FaLinkedinIn size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <FaInstagram size={24} />
            </a>
          </div>
          <div className="mt-8 md:mt-0 text-center md:text-left text-sm text-gray-400">
            <p>© {new Date().getFullYear()} ChatMan. All rights reserved.</p>
            <p>Privacy Policy | Terms of Service | Cookie Policy</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
