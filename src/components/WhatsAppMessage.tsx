import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";
import '../styles/whatsAppButton.css';

const WhatsAppButton: React.FC = () => {
  const { translations, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  
  const phoneNumber: string = "972559200681";
  const message: string = translations.contact.whatsAppMessage;
  const encodedMessage: string = encodeURIComponent(message);
  const whatsappUrl: string = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  useEffect(() => {
    // Add a slight delay for a nice entrance effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleClick = (): void => {
    window.open(whatsappUrl, "_blank");
  };

  // In Hebrew, we want button on right side; in English, on left side
  const buttonPositionClass = language === 'he' ? 'button-right' : 'button-left';

  return (
    <button
      onClick={handleClick}
      className={`whatsapp-button ${isVisible ? 'visible' : ''} ${buttonPositionClass}`}
    >
      <span className="whatsapp-text">{translations.contact.whatsAppButton}</span>
      <FaWhatsapp />
    </button>
  );
};

export default WhatsAppButton;
