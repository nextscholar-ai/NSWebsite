import React, { useEffect, useRef, useState } from 'react';
import './ContactSection.css';

const ContactSection = () => {
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

  return (
    <section className={`contact-section ${isVisible ? 'is-visible' : ''}`} ref={sectionRef} id="contact">
      <div className="cs-top-separator-container">
        <div className="cs-top-separator-line"></div>
      </div>

      <div className="cs-dots-pattern"></div>

      <div className="cs-container">

        {/* Headline Area */}
        <div className="cs-headline-area">
          <div className="cs-badge">GET IN TOUCH</div>
          <h2 className="cs-subheadline">Let's Talk About Your Scholar's Journey</h2>
          <p className="cs-descriptive-line">
            For inquiries, demonstrations, or to schedule a personalized presentation, please contact:
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="cs-split-layout">

          {/* Left Column - Contact Info */}
          <div className="cs-left-column">

            <div className="cs-manager-info">
              <span className="cs-manager-label">Manager:</span>
              <h3 className="cs-manager-name">Mr. Zeshan Siddiqui</h3>
            </div>

            <div className="cs-contact-methods">
              <div className="cs-contact-item">
                <span className="cs-icon">📞</span>
                <div className="cs-contact-text">
                  <span>+918999099921</span>
                  <span className="cs-contact-sub">(Call or WhatsApp)</span>
                </div>
              </div>

              <div className="cs-contact-item">
                <span className="cs-icon">✉️</span>
                <div className="cs-contact-text">
                  <span>scholarnext@gmail.com</span>
                  <span className="cs-contact-sub cs-gold-sub">(Response within 24 hours)</span>
                </div>
              </div>
            </div>

            <div className="cs-social-area">
              <span className="cs-social-label">Follow Us</span>
              <div className="cs-social-icons">
                <a href="#instagram" className="cs-social-link anim-social" style={{ '--social-delay': 1 }} title="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#linkedin" className="cs-social-link anim-social" style={{ '--social-delay': 2 }} title="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="#facebook" className="cs-social-link anim-social" style={{ '--social-delay': 3 }} title="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#youtube" className="cs-social-link anim-social" style={{ '--social-delay': 4 }} title="YouTube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="cs-right-column">
            <div className="cs-visual-container">
              <div className="cs-stars">✦  ✦  ✦</div>
              <div className="cs-visual-circle">
                <div className="cs-visual-content">
                  <span className="cs-visual-icon">✉️</span>
                  <p className="cs-visual-text">We reply within 24 hours</p>
                </div>
              </div>
              <p className="cs-visual-quote">
                Every question is the beginning of a transformation
              </p>
              <div className="cs-stars">✦  ✦  ✦</div>
            </div>
          </div>

        </div>

        {/* Bottom Button Removed */}

      </div>

      <div className="cs-bottom-separator-container">
        <div className="cs-bottom-separator-line"></div>
      </div>

    </section>
  );
};

export default ContactSection;
