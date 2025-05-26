import React, { useRef } from "react";
import { useAnimateOnScroll } from "../hooks/useAnimateOnScroll";
import { useLanguage } from "../contexts/LanguageContext";

const About: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { translations, language } = useLanguage();

  useAnimateOnScroll(titleRef as React.RefObject<HTMLElement>, "appear");
  useAnimateOnScroll(contentRef as React.RefObject<HTMLElement>, "appear");

  return (
    <section className="about-section" id="about">
      <div className="container">
        <h2 ref={titleRef} className="section-title slide-in-left">
          {translations.about.title}
        </h2>
        <div ref={contentRef} className="about-content fade-in">
          <p>{translations.about.content}</p>

          <h2 style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}>
            {translations.about.contentSubTitle}
          </h2>

          <ul
            style={{
              paddingInlineStart: '20px',
              textAlign: language === 'en' ? 'left' : 'right',
              direction: language === 'en' ? 'ltr' : 'rtl'
            }}
          >
            {translations.about.contentBullets.map((bullet: string, index: number) => (
              <li key={index} className="about-bullet">
                {bullet}
              </li>
            ))}
          </ul>

          <p style={{ textAlign: language === 'en' ? 'left' : 'right' }}>
            {translations.about.contentSummaries}
          </p>

          <p style={{ display: 'flex', justifyContent: 'center' }}>
            <strong>{translations.about.contentCloser}</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
