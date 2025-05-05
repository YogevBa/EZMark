import React, { useRef } from 'react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { translations } = useLanguage();
  
  useAnimateOnScroll(titleRef, 'appear');
  useAnimateOnScroll(contentRef, 'appear');

  return (
    <section className="about-section" id="about">
      <div className="container">
        <h2 ref={titleRef} className="section-title slide-in-left">{translations.about.title}</h2>
        <div ref={contentRef} className="about-content fade-in">
          <p>
            {translations.about.content}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;