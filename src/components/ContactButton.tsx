
import React, { useState } from "react";
import { MessageCircle, X, Mail, Phone } from "lucide-react";

const ContactButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContact = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Contact Menu */}
      <div
        className={`glass-effect flex flex-col items-end space-y-3 p-4 transform transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-0 opacity-0 translate-y-10"
        }`}
      >
        <a
          href="mailto:contact@leanit.com"
          className="flex items-center space-x-2 text-gray-800 hover:text-brand-500 transition-colors"
        >
          <span className="text-sm font-medium">이메일</span>
          <Mail className="h-5 w-5" />
        </a>
        <a
          href="tel:+8201012345678"
          className="flex items-center space-x-2 text-gray-800 hover:text-brand-500 transition-colors"
        >
          <span className="text-sm font-medium">전화</span>
          <Phone className="h-5 w-5" />
        </a>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleContact}
        className={`rounded-full w-14 h-14 shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? "bg-white text-brand-500 rotate-90"
            : "bg-brand-500 text-white animate-pulse-scale"
        }`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default ContactButton;
