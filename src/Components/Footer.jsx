import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const sections = [
    {
      title: "ABOUT",
      links: [
        { name: "About Us", url: "#" },
        { name: "Careers", url: "#" },
        { name: "Our Stores", url: "#" },
        { name: "Privacy Policy", url: "#" },
        { name: "Terms & Conditions", url: "#" },
      ],
    },
    {
      title: "HELP",
      links: [
        { name: "Payments", url: "#" },
        { name: "Shipping", url: "#" },
        { name: "Cancellation & Returns", url: "#" },
        { name: "FAQ", url: "#" },
        { name: "Report Infringement", url: "#" },
      ],
    },
    {
      title: "CONSUMER POLICY",
      links: [
        { name: "Return Policy", url: "#" },
        { name: "Security", url: "#" },
        { name: "Sitemap", url: "#" },
        { name: "Grievance Redressal", url: "#" },
        { name: "EPR Compliance", url: "#" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: <FaFacebook />,
      url: "https://facebook.com",
      color: "hover:text-blue-500",
    },
    {
      icon: <FaInstagram />,
      url: "https://instagram.com",
      color: "hover:text-pink-500",
    },
    {
      icon: <FaYoutube />,
      url: "https://youtube.com",
      color: "hover:text-red-600",
    },
    {
      icon: <FaTwitter />,
      url: "https://twitter.com",
      color: "hover:text-sky-400",
    },
    {
      icon: <FaLinkedin />,
      url: "https://linkedin.com",
      color: "hover:text-blue-700",
    },
  ];

  return (
    <footer className="bg-[#172337] text-gray-300 pt-10 pb-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 border-b border-gray-700 pb-8">
        {/* Column Sections */}
        {sections.map((section, index) => (
          <div key={index}>
            <h3 className="text-gray-400 font-semibold text-sm mb-3">
              {section.title}
            </h3>
            <ul className="space-y-2 text-sm">
              {section.links.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.url}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact Info */}
        <div className="col-span-2 md:col-span-2">
          <h3 className="text-gray-400 font-semibold text-sm mb-3">
            CONTACT US
          </h3>
          <p className="text-sm text-gray-300 flex items-center gap-2 mb-2">
            <FaMapMarkerAlt className="text-yellow-400" /> Mumbai, India
          </p>
          <p className="text-sm text-gray-300 flex items-center gap-2 mb-2">
            <FaEnvelope className="text-yellow-400" /> support@mediconnect.com
          </p>
          <p className="text-sm text-gray-300 flex items-center gap-2">
            <FaPhoneAlt className="text-yellow-400" /> +91 9876543210
          </p>

          {/* Social Media */}
          <div className="flex space-x-5 text-xl mt-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-transform duration-300 hover:scale-125 ${social.color}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-gray-100 font-semibold">MediConnect</span> — All
          rights reserved.
        </p>
        <p className="mt-2 sm:mt-0">
          Made with ❤️ by <span className="text-white font-semibold">Zafar</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
