import React, { useEffect, useRef } from 'react';
import { Star, Maximize2, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplashScreen } from './components/SplashScreen';
import { RandomLines } from './components/RandomLines';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// ... [rest of your components like VideoPlayer, VerticalVideoPlayer, TestimonialBadge remain unchanged] ...

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [showTestimonials, setShowTestimonials] = React.useState(true);

  const heroRef = useRef(null);
  const portraitRef = useRef(null);
  const eyesRef = useRef(null);
  const backgroundTextRef = useRef(null);
  const portfolioSectionRef = useRef(null);
  const mainTextRef = useRef(null);
  const triangleRef = useRef(null);
  const fixedBackgroundRef = useRef(null);
  const portfolioRef = useRef(null);

  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.2) * 0.7;
      const y = (e.clientY / window.innerHeight - 0.2) * 0.7;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(portfolioRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: portfolioRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
        once: true
      }
    });

    gsap.to(portraitRef.current, {
      y: 400,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "top+=1500",
        scrub: 3
      }
    });

    gsap.to(eyesRef.current, {
      y: 400,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "top+=1500",
        scrub: 3
      }
    });

    gsap.to(mainTextRef.current, {
      y: 300,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "top+=1500",
        scrub: 3
      }
    });

    ScrollTrigger.create({
      trigger: portfolioRef.current,
      start: "top bottom",
      end: "top top",
      toggleClass: {
        targets: portraitRef.current,
        className: "fixed-portrait"
      },
      markers: false
    });

    gsap.to(triangleRef.current, {
      y: 100,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom+=1000 center",
        scrub: 1
      }
    });

    gsap.to(backgroundTextRef.current, {
      y: -300,
      opacity: 0,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "center top",
        end: "bottom+=-100 top",
        scrub: 1
      }
    });

    gsap.to(portfolioSectionRef.current, {
      y: -300,
      opacity: 100,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "center top",
        end: "bottom+=-100 top",
        scrub: 1
      }
    });

    ScrollTrigger.create({
      trigger: portfolioSectionRef.current,
      start: "bottom bottom",
      onEnter: () => setShowTestimonials(false),
      onLeaveBack: () => setShowTestimonials(true),
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative">
      {isLoading && <SplashScreen onLoadComplete={handleLoadComplete} />}

      {/* Fixed Background */}
      <div 
        ref={fixedBackgroundRef}
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/bg.png')`,
          backgroundAttachment: 'fixed',
          zIndex: -1
        }}
      />

      {/* Main Hero Section */}
      <div ref={heroRef} className="relative min-h-screen w-full overflow-hidden bg-transparent">
        {/* ... Your hero section content ... */}

        {/* Floating Testimonial Badges */}
        {showTestimonials && (
          <div className="fixed inset-0 z-20 pointer-events-none">
            {testimonialBadges.map((badge, index) => (
              <TestimonialBadge key={index} badge={badge} />
            ))}
          </div>
        )}

        {/* ... Triangle & other content ... */}
      </div>

      {/* Portfolio Section */}
      <div ref={portfolioSectionRef} className="relative min-h-screen w-full bg-white z-40 rounded-t-[3rem] texture-overlay">
        {/* ... portfolio content ... */}
      </div>

      {/* Contact Section */}
      <div id="contact-section" className="relative h-screen w-full bg-black z-10 overflow-hidden flex items-center justify-center">
        {/* ... contact content ... */}
      </div>
    </div>
  );
}

export default App;
