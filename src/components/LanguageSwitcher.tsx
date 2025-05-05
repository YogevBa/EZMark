import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, translations } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (lang: 'en' | 'he') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="language-switcher" ref={menuRef}>
      <button 
        className="language-button" 
        onClick={toggleMenu}
        aria-label="Toggle language menu"
        aria-expanded={isOpen}
      >
        <span className="current-language">{language.toUpperCase()}</span>
        <span className="language-icon">🌐</span>
      </button>
      
      {isOpen && (
        <div className="language-menu">
          <button 
            className={`language-option ${language === 'en' ? 'active' : ''}`} 
            onClick={() => handleLanguageChange('en')}
          >
            {translations.language.en}
          </button>
          <button 
            className={`language-option ${language === 'he' ? 'active' : ''}`}
            onClick={() => handleLanguageChange('he')}
          >
            {translations.language.he}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;