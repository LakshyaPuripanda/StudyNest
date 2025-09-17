import { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaArrowUp } from "react-icons/fa";

export default function Footer() {
  const [showButton, setShowButton] = useState(false);

  // Show button only when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Footer */}
      <footer className="w-full border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          
          {/* Brand / About */}
          <div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">StudyNest</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
              A modern Learning Management System built with the MERN stack.  
              Empowering Students & Instructors with secure, seamless, and interactive learning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><p className="hover:text-blue-600 dark:hover:text-blue-400">About</p></li>
              <li><p className="hover:text-blue-600 dark:hover:text-blue-400">Contact</p></li>
              <li><p className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</p></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: <a href="mailto:yesfirst000@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400">yesfirst000@gmail.com</a></li>
              <li>Phone: <a href="tel:123456789" className="hover:text-blue-600 dark:hover:text-blue-400">123456789</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center md:items-end space-y-3">
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mr-7">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400"><FaFacebook size={22} /></a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400"><FaTwitter size={22} /></a>
              <a href="#" className="hover:text-pink-600 dark:hover:text-pink-400"><FaInstagram size={22} /></a>
              <a href="#" className="hover:text-blue-700 dark:hover:text-blue-500"><FaLinkedin size={22} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} StudyNest. All rights reserved.
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg 
                     hover:bg-blue-700 transition duration-300"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </>
  );
}
