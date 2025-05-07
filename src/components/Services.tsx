import React, { useRef } from 'react';
import { useAnimateOnScroll, useAnimateChildrenOnScroll } from '../hooks/useAnimateOnScroll';
import { useLanguage } from '../contexts/LanguageContext';
import type { enTranslations } from '../locales/en';

type ServiceKey = keyof typeof enTranslations.services;

interface Service {
  id: number;
  titleKey: Exclude<ServiceKey, 'title'>;
  icon: string;
}

const Services: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { translations } = useLanguage();
  
  useAnimateOnScroll(titleRef as React.RefObject<HTMLElement>, 'appear');
  useAnimateChildrenOnScroll(gridRef as React.RefObject<HTMLElement>, '.service-card', 'appear');

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
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{translations.services[service.titleKey]?.title}</h3>
              <div className="service-description">{translations.services[service.titleKey]?.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;