import React, { useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import backgroundImage from '../assets/background.png';

interface HeaderProps {
  scrollToContact: () => void;
}

const Header: React.FC<HeaderProps> = ({ scrollToContact }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { translations } = useLanguage();

  useEffect(() => {
    // Animate title
    const titleElement = titleRef.current;
    if (titleElement) {
      setTimeout(() => {
        titleElement.classList.add('appear');
      }, 300);
    }

    // Animate welcome text
    const textElement = textRef.current;
    if (textElement) {
      setTimeout(() => {
        textElement.classList.add('appear');
      }, 600);
    }

    // Animate CTA button
    const buttonElement = buttonRef.current;
    if (buttonElement) {
      setTimeout(() => {
        buttonElement.classList.add('appear');
      }, 900);
    }
  }, []);

  return (
    <header className="header background-image-header">
      <div className="header-overlay"></div>
      <div className="header-content">
        <h1 ref={titleRef} className="site-title fade-in">{translations.header.title}</h1>
        <p ref={textRef} className="welcome-text fade-in">
          {translations.header.welcomeText}
        </p>
        <button 
          ref={buttonRef} 
          className="cta-button fade-in hover-lift pulse"
          onClick={scrollToContact}
        >
          {translations.header.ctaButton}
        </button>
      </div>
    </header>
  );
};

export default Header;