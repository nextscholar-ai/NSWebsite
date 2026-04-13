import React, { useEffect, useRef, useState } from 'react';
import './ProgramOverview.css';

const ProgramOverview = ({ programData }) => {
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

  if (!programData) return null;

  const { 
    badge, 
    heading, 
    subheading, 
    mathSection, 
    scienceSection, 
    acceleratedBox, 
    bottomCallout,
    classRange 
  } = programData;

  // Use classRange or default to 1-10
  const startClass = classRange?.start || 1;
  const endClass = classRange?.end || 10;
  const classes = [];
  for (let i = startClass; i <= endClass; i++) {
    classes.push(i);
  }

  return (
    <section className={`program-overview-section ${isVisible ? 'is-visible' : ''}`} ref={sectionRef} id="program">
      <div className="po-grid-pattern"></div>
      
      <div className="po-top-separator-container">
        <div className="po-top-separator-line"></div>
      </div>

      <div className="po-container">
        
        {/* Headline Area */}
        <div className="po-headline-area">
          <div className="po-badge">{badge || 'PROGRAM OVERVIEW'}</div>
          <h2 className="po-subheadline">{heading || 'From Foundations to Excellence — A Mastery Pathway'}</h2>
          <p className="po-descriptive-line">
            {subheading || 'Mathematics · Science · CBSE Aligned · English Medium'}
          </p>
        </div>

        {/* Split Content Area */}
        <div className="po-split-layout">
          
          {/* Left Column - Visual Staircase */}
          <div className="po-left-column">
            <div className="po-ladder-container">
              <div className="po-ladder-spine"></div>
              
              {classes.map((level) => {
                const hasScience = level >= (scienceSection?.startClass || 6);
                const isAccelerated = level >= (acceleratedBox?.startClass || 9);
                
                return (
                  <div 
                    key={level} 
                    className={`po-ladder-rung anim-rung ${isAccelerated ? 'po-highlight-rung' : ''}`} 
                    style={{ '--rung-delay': level }}
                  >
                    {/* Left: Label */}
                    <div className="po-rung-label-container">
                      <div className="po-rung-label">Class {level}</div>
                    </div>
                    
                    {/* Center: The Rung Tracks */}
                    <div className="po-rung-center-area">
                      {/* Math Side */}
                      <div className="po-rung-side po-math-side">
                        <span className="po-rung-icon">📘</span>
                        <div className="po-rung-bar po-math-bar"></div>
                      </div>
                      
                      {/* Spine attachment dot */}
                      <div className="po-rung-spine-dot"></div>

                      {/* Science Side */}
                      <div className="po-rung-side po-science-side">
                        {hasScience && (
                          <>
                            <div className="po-rung-bar po-science-bar"></div>
                            <span className="po-rung-icon">🔬</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right: Accelerated Badge */}
                    <div className="po-rung-badge-container">
                      {isAccelerated && level === acceleratedBox?.startClass && (
                        <div className="po-accelerated-badge">{acceleratedBox?.badgeText || '⚡ 2 Years'}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center Separator */}
          <div className="po-separator-column">
            <div className="po-vert-line"></div>
            <div className="po-star-icon">✦</div>
            <div className="po-vert-line"></div>
          </div>

          {/* Right Column - Text Content */}
          <div className="po-right-column">
            <div className="po-text-block po-math-text anim-text" style={{ '--text-delay': 3 }}>
              <h3>{mathSection?.title || 'Mathematics · Class 1 to Class 10'}</h3>
              <p>
                {mathSection?.description || 'A sequential, mastery-based progression where students advance only after achieving 100% competence at each level.'}
              </p>
            </div>

            <div className="po-text-block po-science-text anim-text" style={{ '--text-delay': 5 }}>
              <h3>{scienceSection?.title || 'Science · Class 6 to Class 10'}</h3>
              <p>
                {scienceSection?.description || 'Beginning in Class 6, Science follows the same rigorous mastery model — building curiosity into deep conceptual understanding.'}
              </p>
            </div>

            <div className="po-accelerated-box anim-text" style={{ '--text-delay': 7 }}>
              <div className="po-accent-bar"></div>
              <p>
                {acceleratedBox?.text || (
                  <>
                    ⚡ <strong>Complete in just 2 years</strong><br/>
                    Students beginning at the Class 9 level can complete the entire journey within two years.
                  </>
                )}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Callout */}
        <div className="po-bottom-callout anim-bottom">
          <span className="po-quote-mark">✦</span>
          <p>
            {bottomCallout || '100% mastery before advancement. No exceptions. No gaps. Just deep, lasting understanding.'}
          </p>
          <span className="po-quote-mark">✦</span>
        </div>

      </div>
    </section>
  );
};

export default ProgramOverview;
