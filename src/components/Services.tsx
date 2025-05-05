import React, { useRef } from 'react';
import { useAnimateOnScroll, useAnimateChildrenOnScroll } from '../hooks/useAnimateOnScroll';
import { useLanguage } from '../contexts/LanguageContext';

interface Service {
  id: number;
  titleKey: keyof typeof import('../locales/en').enTranslations.services;
  icon: string;
}

const Services: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { translations } = useLanguage();
  
  useAnimateOnScroll(titleRef, 'appear');
  useAnimateChildrenOnScroll(gridRef, '.service-card', 'appear');

  const services: Service[] = [
    {
      id: 1,
      titleKey: 'service1',
      icon: '📝'
    },
    {
      id: 2,
      titleKey: 'service2',
      icon: '📚'
    },
    {
      id: 3,
      titleKey: 'service3',
      icon: '🔍'
    },
    {
      id: 4,
      titleKey: 'service4',
      icon: '✏️'
    }
  ];

  return (
    <section className="services-section" id="services">
      <div className="container">
        <h2 ref={titleRef} className="section-title slide-in-right">{translations.services.title}</h2>
        <div ref={gridRef} className="services-grid">
          {services.map((service, index) => (
            <div 
              className={`service-card scale-in hover-lift stagger-delay-${index + 1}`} 
              key={service.id}
            >
              <div className="service-icon floating">{service.icon}</div>
              <h3 className="service-title">{translations.services[service.titleKey].title}</h3>
              <p className="service-description">{translations.services[service.titleKey].description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;