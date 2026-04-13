import React, { useEffect, useRef, useState } from 'react';
import './PartnersSection.css';
import { client } from './sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

const PartnersSection = ({ partners }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const data = partners && partners.length > 0 ? partners : [];

  return (
    <section className={`partners-section ${isVisible ? 'is-visible' : ''}`} ref={sectionRef} id="partners">
      
      <div className="pt-top-separator-container">
        <div className="pt-top-separator-line"></div>
      </div>

      <div className="pt-dots-pattern"></div>

      <div className="pt-container">
        
        {/* Headline Area */}
        <div className="pt-headline-area">
          <div className="pt-badge">TRUSTED BY</div>
          <h2 className="pt-subheadline">Partner Schools Across the Region</h2>
          <p className="pt-descriptive-line">
            Leading institutions that choose Next Scholar for mastery-based learning
          </p>
        </div>

        {/* Logo Wall */}
        <div className="pt-logo-grid">
          {data.map((partner, index) => (
            <div 
              key={partner._id || index} 
              className="pt-logo-card anim-card" 
              style={{ '--card-delay': index }}
            >
              {partner.logo ? (
                <img src={urlFor(partner.logo)} alt={partner.name} className="pt-school-logo" />
              ) : (
                <div className="pt-school-icon">🏫</div>
              )}
              <div className="pt-school-name">{partner.name}</div>
            </div>
          ))}
        </div>

        {/* Impact Statement */}
        <div className="pt-impact-statement anim-impact">
          <span className="pt-star">★</span>
          <p>
            <em>Partnering with 25+ schools and growing — bringing mastery-based learning to thousands of students.</em>
          </p>
          <span className="pt-star">★</span>
        </div>

      </div>

      <div className="pt-bottom-separator-container">
        <div className="pt-bottom-separator-line"></div>
      </div>
      
    </section>
  );
};

export default PartnersSection;
