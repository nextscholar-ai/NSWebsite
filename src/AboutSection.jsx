import React, { useEffect, useRef, useState } from 'react';
import './AboutSection.css';

const useIntersectionObserver = (options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (targetRef.current) {
          observer.unobserve(targetRef.current);
        }
      }
    }, options);

    const currentRef = targetRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options]);

  return [targetRef, isIntersecting];
};

const SmartCounter = ({ end, suffix, duration, isVisible, isFloat }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let startTime = null;
    let animationFrame;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const x = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - x, 4);
      const currentVal = easeProgress * end;
      setCount(currentVal);

      if (x < 1) {
        animationFrame = window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  let displayVal = isFloat ? count.toFixed(1) : Math.floor(count);
  
  return <span>{displayVal.toLocaleString()}{suffix}</span>;
};

const CircularProgress = ({ percent, label, isVisible, delay }) => {
  return (
    <div className={`circular-stat ${isVisible ? 'animate' : ''}`} style={{ '--delay': delay }}>
      <div className="circle-wrap">
        <svg viewBox="0 0 100 100">
          <circle className="circle-bg" cx="50" cy="50" r="45" />
          <circle 
            className="circle-progress" 
            cx="50" 
            cy="50" 
            r="45" 
            style={{ strokeDasharray: `283`, strokeDashoffset: isVisible ? `calc(283 - (283 * ${percent}) / 100)` : '283' }}
          />
        </svg>
        <div className="circle-content">
          <span className="percent-text">{percent}%</span>
        </div>
      </div>
      <span className="stat-label">{label}</span>
    </div>
  );
};

const ComparisonCard = ({ isVisible }) => (
  <div className={`about-comparison-card ${isVisible ? 'revealed' : ''}`}>
    <h3 className="comparison-title">Before / After</h3>
    <div className="comparison-grid">
      <div className="comparison-col before">
        <span className="col-header">Before</span>
        <ul className="comparison-list">
          <li><span>😰</span> Memorization</li>
          <li><span>😥</span> Fear of failure</li>
          <li><span>📉</span> Average results</li>
        </ul>
      </div>
      <div className="comparison-divider"></div>
      <div className="comparison-col after">
        <span className="col-header">After</span>
        <ul className="comparison-list">
          <li><span>💡</span> Deep logic</li>
          <li><span>🚀</span> Curiosity-driven</li>
          <li><span>🏆</span> Exceptional output</li>
        </ul>
      </div>
    </div>
  </div>
);

const AboutSection = ({ aboutData }) => {
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.15 });

  if (!aboutData) return null;

  const { badge, heading, missionText, bulletPoints, stats } = aboutData;

  return (
    <section className={`about-section-modern ${isVisible ? 'is-visible' : ''}`} ref={sectionRef} id="about">
      {/* Abstract Background Elements */}
      <div className="abstract-orb orb-1"></div>
      <div className="abstract-orb orb-2"></div>
      <div className="abstract-zigzag"></div>

      <div className="about-modern-container">
        
        <div className="about-modern-layout">
          
          {/* Left Side: Story & Mission */}
          <div className="about-modern-left">
            <div className={`reveal-content ${isVisible ? 'revealed' : ''}`}>
              <div className="premium-tag">{badge || 'OUR LEGACY'}</div>
              <h2 className="gradient-heading">{heading || 'About Next Scholar'}</h2>
              <div className="modern-divider"></div>
              
              <p className="modern-mission">
                {missionText || "Next Scholar isn't just a program — it's a mindset shift. We rebuild confidence, replace fear with curiosity, and turn average into exceptional."}
              </p>

              <div className="modern-bullets">
                {bulletPoints && bulletPoints.map((item, idx) => (
                  <div key={idx} className="bullet-item" style={{ '--i': idx + 1 }}>
                    <div className="bullet-icon-modern">{item.icon || '⚡'}</div>
                    <div className="bullet-text">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Creative Stats & Comparison */}
          <div className="about-modern-right">
            <div className="stats-creative-grid">
              
              {stats?.mainStat && (
                <div className="big-stat-box">
                  <div className="stat-giant">
                    <SmartCounter 
                      end={stats.mainStat.value} 
                      suffix={stats.mainStat.suffix} 
                      duration={2000} 
                      isVisible={isVisible} 
                    />
                  </div>
                  <div className="stat-sublabel">{stats.mainStat.label}</div>
                </div>
              )}

              <div className="circular-stats-group">
                {stats?.circularStats?.map((stat, idx) => (
                  <CircularProgress 
                    key={idx}
                    percent={stat.percent} 
                    label={stat.label} 
                    isVisible={isVisible} 
                    delay={`${0.5 + idx * 0.3}s`} 
                  />
                ))}
              </div>

              {/* New Before/After Comparison Card */}
              <ComparisonCard isVisible={isVisible} />

              {stats?.floatingCard && (
                <div className="floating-stat-card">
                  <div className="rating-row">
                    <span className="star-gold">★★★★★</span>
                    <span className="rating-num">{stats.floatingCard.rating}</span>
                  </div>
                  <p>{stats.floatingCard.text}</p>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
