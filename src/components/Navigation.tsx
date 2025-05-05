import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface NavigationProps {
  scrollToContact: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ scrollToContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { translations } = useLanguage();

  // Handle scroll event to change navigation style when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to scroll to a specific section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu if open
      setMobileMenuOpen(false);
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`main-navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo fade-in appear">EZMark</div>
        
        {/* Desktop Navigation */}
        <div className="nav-right">
          <ul className="nav-links">
            <li className="fade-in appear">
              <button onClick={() => scrollToSection('about')}>{translations.navigation.about}</button>
            </li>
            <li className="fade-in appear stagger-delay-1">
              <button onClick={() => scrollToSection('services')}>{translations.navigation.services}</button>
            </li>
            <li className="fade-in appear stagger-delay-2">
              <button 
                onClick={scrollToContact} 
                className="nav-contact-button hover-lift"
              >
                {translations.navigation.contact}
              </button>
            </li>
          </ul>
          
          <div className="desktop-language-switcher">
            <LanguageSwitcher />
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-button ${mobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          <button 
            className="mobile-close-button"
            onClick={toggleMobileMenu}
            aria-label="Close menu"
          >
            <span></span>
            <span></span>
          </button>
          <div className="mobile-nav-header">
            <div className="mobile-nav-logo">EZMark</div>
          </div>
          <ul className="mobile-nav-links">
            <li>
              <button onClick={() => scrollToSection('about')}>{translations.navigation.about}</button>
            </li>
            <li>
              <button onClick={() => scrollToSection('services')}>{translations.navigation.services}</button>
            </li>
            <li>
              <button onClick={scrollToContact}>{translations.navigation.contact}</button>
            </li>
            <li className="mobile-language-switch">
              <LanguageSwitcher />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;