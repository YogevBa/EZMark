import { useRef, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import About from './components/About';
import Services from './components/Services';
import ContactForm from './components/ContactForm';
import FloatingButton from './components/FloatingButton';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';
import './styles/global.css';
import './styles/animations.css';
import './styles/navigation.css';
import './styles/floatingButton.css';
import './styles/languageSwitcher.css';
import './styles/whatsAppButton.css';
import './styles/rtl.css';
import { useScrollProgress } from './hooks/useAnimateOnScroll';
import WhatsAppButton from './components/WhatsAppMessage';

function AppContent() {
  const contactRef = useRef<HTMLDivElement>(null);
  
  // Initialize scroll progress indicator
  useScrollProgress();

  // Function to handle smooth scrolling to contact section
  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Function to handle parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = document.querySelectorAll('section');
      
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + scrollY;
        const offset = (scrollY - sectionTop) * 0.1;
        
        // Apply subtle parallax effect to section backgrounds
        if (offset > -300 && offset < 300) {
          section.style.backgroundPositionY = `${offset}px`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-container">
        <div id="scroll-progress-bar" className="scroll-progress-bar"></div>
      </div>
      
      <Navigation scrollToContact={scrollToContact} />
      <Header scrollToContact={scrollToContact} />
      <WhatsAppButton />
      <About />
      <Services />
      <div ref={contactRef}>
        <ContactForm />
      </div>
      <Footer />
      <FloatingButton scrollToTop={scrollToTop} />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;