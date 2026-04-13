import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import AboutSection from './AboutSection';
import SuccessFeed from './SuccessFeed';
import ProgramOverview from './ProgramOverview';
import PartnersSection from './PartnersSection';
import ContactSection from './ContactSection';
import EnquiryForm from './EnquiryForm';
import { getHeroData, getAboutData, getProgramOverviewData, getTestimonials, getPartners } from './sanityService';
import { client } from './sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    hero: null,
    about: null,
    program: null,
    testimonials: [],
    partners: []
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [hero, about, program, testimonials, partners] = await Promise.all([
        getHeroData(),
        getAboutData(),
        getProgramOverviewData(),
        getTestimonials(),
        getPartners()
      ]);
      setData({ hero, about, program, testimonials, partners });
    } catch (err) {
      console.error("Error fetching data from Sanity:", err);
      setError("Failed to load content. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setIsLoaded(true), 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading Next Scholar Experience...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <h2>Oops!</h2>
        <p>{error}</p>
        <button className="gold-btn" onClick={fetchData}>Retry</button>
      </div>
    );
  }

  const { hero, about, program, testimonials, partners } = data;

  return (
    <div className="app-wrapper">
      {/* Global Parallax Background */}
      <div 
        className="global-fixed-bg"
        style={{ backgroundImage: "url('/collage_bg.png')" }}
      ></div>
      <div className="global-overlay"></div>

      {/* Premium Header Navbar */}
      <header className="top-navbar">
        <div className="nav-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#program" className="nav-link">Program</a>
          <a href="#partners" className="nav-link">Partners</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        <div className="nav-actions">
          <button className="nav-btn-outline">Login</button>
          <button 
            className="nav-btn-outline" 
            onClick={() => window.open('https://nextscholar.gnomio.com/course/index.php', '_blank')}
          >
            Study
          </button>
          <button className="nav-btn-solid" onClick={() => setIsModalOpen(true)}>Join Class</button>
        </div>
      </header>

      <div className="nova-hero-container gradient-bg" id="home">
        
        {/* Soft Edge Fade */}
        <div className="hero-overlay-color"></div>
        {/* Subtle Gradient Overlay */}
        <div className="hero-overlay-gradient"></div>

        <div className="hero-layout-grid left-aligned">
          {/* Left Side: Headline, Subheading, Buttons */}
          <div className="hero-content-left">
            <div className={`fade-up delay-2 ${isLoaded ? 'visible' : ''}`}>
              <div className="premium-badge">{hero?.badge || 'KNOWLEDGE'}</div>
              <h1 className="hero-headline">{hero?.heading || 'Next Scholar'}</h1>
            </div>

            <div className={`fade-up delay-3 ${isLoaded ? 'visible' : ''}`}>
              <p className="hero-subheading">
                {hero?.subheading || 'A Foundation Mastery Program for Mathematics, Science, and English'} <span className="sparkle">✨</span>
              </p>
            </div>

            <div className={`fade-up delay-4 ${isLoaded ? 'visible' : ''}`}>
              <div className="hero-buttons">
                <button className="gold-btn" onClick={() => setIsModalOpen(true)}>Join Class <span className="btn-arrow">&rarr;</span></button>
              </div>
              <p className="micro-affirmation">{hero?.microAffirmation || 'Join thousands of scholars rising beyond limits'}</p>
            </div>
          </div>

          {/* Right Side: Success Feed */}
          <div className={`hero-content-right success-feed-area fade-up delay-5 ${isLoaded ? 'visible' : ''}`}>
             <SuccessFeed testimonials={testimonials} />
          </div>
        </div>

      </div>
      
      {/* About Section */}
      <AboutSection aboutData={about} />

      {/* Program Overview */}
      <ProgramOverview programData={program} />

      {/* Partners Section */}
      <PartnersSection partners={partners} />

      {/* Contact Section */}
      <ContactSection />

      {/* Enquiry Form Modal */}
      {isModalOpen && <EnquiryForm onClose={() => setIsModalOpen(false)} />}
      
      {/* Secret Admin Button */}
      <button 
        className="secret-admin-trigger" 
        onClick={() => window.open('https://nextscholar.sanity.studio', '_blank')}
        title="Admin Panel"
      >
        🔒
      </button>

    </div>
  );
}

export default App;
