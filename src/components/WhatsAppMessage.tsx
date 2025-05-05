import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";

const WhatsAppButton: React.FC = () => {
      const { translations } = useLanguage();
    
  const phoneNumber: string = "972559200681";
  const message: string = translations.contact.whatsAppMessage;
  const encodedMessage: string = encodeURIComponent(message);
  const whatsappUrl: string = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  const handleClick = (): void => {
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        padding: "12px 20px",
        fontSize: "16px",
        backgroundColor: "#25D366",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      {translations.contact.whatsAppButton}
      <FaWhatsapp size={20} />

    </button>
  );
};

export default WhatsAppButton;
