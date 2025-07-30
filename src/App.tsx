import React, { useEffect, useRef } from 'react';
import { Star, Maximize2, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplashScreen } from './components/SplashScreen';
import { RandomLines } from './components/RandomLines';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface VideoPlayerProps {
  src?: string;
  title: string;
  isShowreel?: boolean;
}

function VideoPlayer({ src, title, isShowreel = false }: VideoPlayerProps) {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (src) {
    return (
      <div 
        ref={containerRef}
        className={`relative group cursor-pointer aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
        onClick={isShowreel ? handleVideoClick : undefined}
      >
        <video
          ref={videoRef}
          src={src}
          autoPlay={false}
          muted={false}
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        {isShowreel && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <div className="w-0 h-0 border-l-[12px] border-r-0 border-t-[8px] border-b-[8px] border-l-white border-t-transparent border-b-transparent ml-1"></div>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
        >
          {isFullscreen ? (
            <X size={16} className="text-white" />
          ) : (
            <Maximize2 size={16} className="text-white" />
          )}
        </button>
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="text-white font-bosenAlt text-sm bg-black/50 px-3 py-1 rounded-full">
            {title}
          </span>
        </div>
      </div>
    );
  }

  // Placeholder for videos without src
  return (
    <div className={`relative group cursor-pointer ${isShowreel ? 'aspect-video' : 'aspect-video'} rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-3 bg-white/10 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-l-[8px] border-r-0 border-t-[6px] border-b-[6px] border-l-white border-t-transparent border-b-transparent ml-1"></div>
          </div>
          <span className="text-white/60 font-bosenAlt text-sm">{title}</span>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
      <button
        onClick={() => {}}
        className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
      >
        <Maximize2 size={16} className="text-white" />
      </button>
    </div>
  );
}

function VerticalVideoPlayer({ title }: { title: string }) {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative group cursor-pointer aspect-[9/16] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      <div className="w-full h-full bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-2 bg-white/10 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-l-[6px] border-r-0 border-t-[4px] border-b-[4px] border-l-white border-t-transparent border-b-transparent ml-0.5"></div>
          </div>
          <span className="text-white/60 font-bosenAlt text-xs">{title}</span>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
      <button
        onClick={toggleFullscreen}
        className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
      >
        {isFullscreen ? (
          <X size={12} className="text-white" />
        ) : (
          <Maximize2 size={12} className="text-white" />
        )}
      </button>
      <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <span className="text-white font-bosenAlt text-xs bg-black/50 px-2 py-1 rounded-full">
          {title}
        </span>
      </div>
    </div>
  );
}

interface TestimonialBadge {
  word: string;
  rating: number;
  attribution: string;
  position: { top: string; left: string };
  delay: number;
}

const testimonialBadges: TestimonialBadge[] = [
  { word: "VISIONARY", rating: 5, attribution: "— Forbes", position: { top: "10%", left: "25%" }, delay: 1.2 },
  { word: "MASTERFUL", rating: 5, attribution: "— Design Week", position: { top: "15%", left: "70%" }, delay: 1.8 },
  { word: "BRILLIANT", rating: 5, attribution: "— Creative Review", position: { top: "25%", left: "20%" }, delay: 2.4 },
  { word: "INNOVATIVE", rating: 5, attribution: "— Fast Company", position: { top: "30%", left: "87%" }, delay: 3.0 },
  { word: "ICONIC", rating: 5, attribution: "— Dezeen", position: { top: "50%", left: "20%" }, delay: 2.1 },
  { word: "PROFOUND", rating: 5, attribution: "— AIGA", position: { top: "47%", left: "84%" }, delay: 3.3 },
  { word: "STUNNING", rating: 5, attribution: "— Vogue", position: { top: "12%", left: "10%" }, delay: 2.7 },
  { word: "REVOLUTIONARY", rating: 5, attribution: "— Wired", position: { top: "40%", left: "2%" }, delay: 2.0 },
  { word: "CAPTIVATING", rating: 5, attribution: "— Elle", position: { top: "55%", left: "68%" }, delay: 3.9 },
  { word: "CREATIVE", rating: 5, attribution: "— Inkwellmedia", position: { top: "35%", left: "73%" }, delay: 3.9 }
];

function TestimonialBadge({ badge }: { badge: TestimonialBadge }) {
  return (
    <div 
      className="absolute opacity-0 animate-fade-in-delayed group cursor-default"
      style={{ 
        top: badge.position.top, 
        left: badge.position.left,
        animationDelay: `${badge.delay}s`,
        animationFillMode: 'forwards'
      }}
    >
      <div className="text-left">
        {/* Stars */}
        <div className="flex mb-1">
          {[...Array(badge.rating)].map((_, i) => (
            <Star 
              key={i} 
              size={10} 
              className="fill-white/20 text-white/70 mr-0.5" 
            /> 
          ))}
        </div>

       <div className="relative inline-block text-[1.6rem] sm:text-2xl font-bosenAlt uppercase tracking-wide leading-none">
          {/* Actual Word with Shine Animation */}
          <span className="relative z-10 text-white/10 animate-shine">{badge.word}</span>
        </div>

        {/* Attribution */}
        <div className="mt-1 text-sm text-white/20 font-light tracking-wide">
          {badge.attribution}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);
  const backgroundTextRef = useRef<HTMLDivElement>(null);
  const portfolioSectionRef = useRef<HTMLDivElement>(null);
  const mainTextRef = useRef<HTMLDivElement>(null);
  const triangleRef = useRef<HTMLDivElement>(null);
  const fixedBackgroundRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef();

  // Mouse tracking state
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  // Handle splash screen completion
  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  // Mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.2) * 0.7; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.2) * 0.7; // -1 to 1
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

 useEffect(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.registerPlugin(ScrollTrigger);

   // Animate portfolio section as it enters
gsap.to(portfolioRef.current, {
  y: 0,
  opacity: 1,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: portfolioRef.current,
    start: "top 80%", // start thoda pehle
    toggleActions: "play none none reverse",
    once: true
  }
});

  gsap.to(portraitRef.current, {
  y: 400, // ya 200 if you want smaller slide
  scrollTrigger: {
    trigger: heroRef.current,
    start: "top top",
    end: "top+=1500", // 🔁 reduce to make it slower & smoother
    scrub: 3        // 🔁 increase for smoother animation
  }
});

   gsap.to(eyesRef.current, {
  y: 400, // ya 200 if you want smaller slide
  scrollTrigger: {
    trigger: heroRef.current,
    start: "top top",
    end: "top+=1500", // 🔁 reduce to make it slower & smoother
    scrub: 3        // 🔁 increase for smoother animation
  }
});
   
    gsap.to(mainTextRef.current, {
  y: 300, // ya 200 if you want smaller slide
  scrollTrigger: {
    trigger: heroRef.current,
    start: "top top",
    end: "top+=1500", // 🔁 reduce to make it slower & smoother
    scrub: 3        // 🔁 increase for smoother animation
  }
});
   
 // Fix image earlier when portfolio just starts to appear
ScrollTrigger.create({
  trigger: portfolioRef.current, 
  start: "top bottom", // ✅ Jald trigger
    end: "top top",   // 👈 Jab portfolio top ko touch kare
  toggleClass: {
    targets: portraitRef.current,
    className: "fixed-portrait"
  },
  markers: false
});

  // Triangle parallax
  gsap.to(triangleRef.current, {
    y: 100,
    scrollTrigger: {
      trigger: heroRef.current,
      start: "top top",
      end: "bottom+=1000 center",
      scrub: 1
    }
  });

  // Background text fade
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

  // Portfolio up animation
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

  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);


  return (
    <div className="relative">
      {/* Splash Screen */}
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
      <div 
        ref={heroRef}
        className="relative min-h-screen w-full overflow-hidden bg-transparent"
      >
      {/* Portrait */}
<div 
  ref={portraitRef}
  className="absolute inset-0 flex items-center justify-center z-30" 
  style={{ top: '20%', left: '1%' }}
>
  <div className="relative"> 
    <div 
      className="
        w-[35rem] h-[35rem]
        sm:w-600px sm:h-600px 
        md:w-[50rem] md:h-[50rem] 
        lg:w-[62.5rem] lg:h-[62.5rem] 
        overflow-hidden 
        opacity-0 
        animate-fade-in-delayed
      "
      style={{ 
        animationDelay: '0.1s', 
        animationFillMode: 'forwards'
      }}
    > 
      <img 
        src="/me.png"
        alt="Portrait"
        className="w-full h-full object-cover grayscale contrast-110 brightness-90"
        style={{ transform: 'scale(1.05)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-transparent" />
    </div> 
  </div>
</div>

         {/* eyes */}
<div 
  ref={eyesRef}
  className="absolute inset-0 flex items-center justify-center z-20" 
  style={{ top: '20%', left: '1%',
          transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px)`,
         }}
>
  <div className="relative"> 
    <div 
      className="
        w-[35rem] h-[35rem]
        sm:w-600px sm:h-600px 
        md:w-[50rem] md:h-[50rem]  
        lg:w-[62.5rem] lg:h-[62.5rem] 
        overflow-hidden 
        opacity-0 
        animate-fade-in-delayed
      "
      style={{ 
        animationDelay: '0.5s', 
        animationFillMode: 'forwards'
      }}
    > 
      <img 
        src="/eyes.png"
        alt="Portrait"
        className="w-full h-full object-cover grayscale contrast-110 brightness-90"
        style={{ transform: 'scale(1.05)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-transparent" />
    </div> 
  </div>
</div>

        {/* Background Text - Aamir Naqvi at Bottom */}
        <div 
          ref={backgroundTextRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          style={{ 
            top: '65%',
            transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px)`,
            transition: 'transform 0.4s ease-out'
          }}
        >
          <div  
            className="text-[4rem] md:text-[10rem] lg:text-[20rem] font-bosenAlt text-black/35 select-none leading-none opacity-0 animate-fade-in-delayed"
            style={{
              animationDelay: '0.1s',  
              animationFillMode: 'forwards',
              textShadow: '0 10px 20px rgba(0,0,0,0.2)'
            }}
          >
            AAMIR NAQVI
          </div>
        </div>
        
        {/* Main Typography */}
        <div 
          ref={mainTextRef}
          className="absolute inset-0 flex items-center justify-center z-30"
          style={{ top: '60%', left: '-1%' }}
        >
          <div className="text-center z-10 px-6">
            <div 
              className="text-2xl md:text-4xl lg:text-5xl font-bosenAlt tracking-tight text-white/80 leading-tight opacity-0 animate-fade-in-delayed"
              style={{ 
                animationDelay: '0.8s', 
                animationFillMode: 'forwards',
                textShadow: '0 15px 30px rgba(0,0,0,0.5)'
              }}
            >
              I EDIT
            </div>
            <div 
              className="text-2xl md:text-3xl lg:text-4xl font-bosenAlt tracking-tight text-white/80 leading-tight mt-2 opacity-0 animate-fade-in-delayed"
              style={{ 
                animationDelay: '1.1s', 
                animationFillMode: 'forwards',
                textShadow: '0 15px 30px rgba(0,0,0,0.5)'
              }}
            >
              VISUALS THAT
            </div>
            <div 
              className="text-2xl md:text-4xl lg:text-5xl font-bosenAlt tracking-tight text-white leading-tight mt-2 opacity-0 animate-fade-in-delayed"
              style={{ 
                animationDelay: '1.4s', 
                animationFillMode: 'forwards',
                textShadow: '0 15px 30px rgba(0,0,0,0.5)'
              }}
            >
              BUILD BRANDS
            </div>
          </div>
        </div>

        {/* Floating Testimonial Badges */}
        <div className="fixed inset-0 z-20 pointer-events-none">
          {testimonialBadges.map((badge, index) => (
            <TestimonialBadge key={index} badge={badge} />
          ))}
        </div>

        {/* Bottom Triangle Shape */}
        <div 
          ref={triangleRef}
          className="absolute bottom-4 left-[49%] transform -translate-x-1/2 opacity-0 animate-fade-in-delayed z-30 cursor-pointer"
          onClick={() => {
            document.getElementById('contact-section')?.scrollIntoView({ 
              behavior: 'smooth' 
            });
          }}
          style={{ 
            animationDelay: '3.5s', 
            animationFillMode: 'forwards',
            filter: 'drop-shadow(0 10px 20px rgba(34, 211, 238, 0.3))'
          }}
        >
          <div className="flex flex-col items-center">
            <div 
              className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-cyan-400 animate-bounce-triangle"
            />
            <p className="text-white/60 text-xs font-bosenAlt mt-2 uppercase tracking-wide">
              Scroll Down
            </p>
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div 
         ref={portfolioSectionRef} 
        className="relative min-h-screen w-full bg-white z-40 rounded-t-[3rem] texture-overlay">
        
        {/* Random Lines Overlay */}
        <RandomLines count={25} className="z-10" />
        
        {/* Additional texture layer */}
        <div className="absolute inset-0 texture-overlay-light opacity-30 z-10" />
        
        <div className="container mx-auto px-6 py-20">
          <div className="relative text-center mb-16 z-20">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bosenAlt text-black/90 mb-6 tracking-tight">
              PORTFOLIO
            </h2>
            <p className="text-xl md:text-2xl text-black/60 max-w-3xl mx-auto leading-relaxed">
              Visual stories that shape brands and captivate audiences worldwide
            </p>
          </div>
          
          {/* Show Reel Section */}
          <div className="relative mb-20 z-20">
            <h3 className="text-3xl md:text-4xl font-bosenAlt text-black/80 mb-8 text-center tracking-tight">
              SHOW REEL
            </h3>
            <div className="max-w-4xl mx-auto">
              <VideoPlayer 
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                title="SHOW REEL 2024"
                isShowreel={true}
              />
            </div>
          </div>

          {/* 3x3 Grid of 16:9 Videos */}
          <div className="relative mb-20 z-20">
            <h3 className="text-3xl md:text-4xl font-bosenAlt text-black/80 mb-8 text-center tracking-tight">
              FEATURED WORK
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {Array.from({ length: 9 }, (_, i) => (
                <VideoPlayer 
                  key={i}
                  title={`PROJECT ${String(i + 1).padStart(2, '0')}`}
                />
              ))}
            </div>
          </div>

          {/* 6x4 Grid of 9:16 Videos */}
          <div className="relative mb-20 z-20">
            <h3 className="text-3xl md:text-4xl font-bosenAlt text-black/80 mb-8 text-center tracking-tight">
              SOCIAL CONTENT
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {Array.from({ length: 12 }, (_, i) => (
                <VerticalVideoPlayer 
                  key={i}
                  title={String(i + 1).padStart(2, '0')}
                />
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Contact Section */}
      <div id="contact-section" className="relative h-screen w-full bg-black z-10 overflow-hidden flex items-center justify-center">
        {/* Subtle Background Texture */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }}
          />
        </div>
        
        {/* Main Content */}
        <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
          {/* Main Heading */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bosenAlt text-white mb-4 tracking-tight leading-none">
              LET'S START A CONVERSATION
            </h1>
            <p className="text-lg md:text-xl text-white/50 leading-relaxed">
              Drop me a message, let's make something users will love.
            </p>
          </div>

          {/* Contact Links */}
          <div className="space-y-12">
            
            {/* Email */}
            <div className="group">
              <a 
                href="mailto:sanimani@gmail.com"
                className="block transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <svg className="w-8 h-8 text-white/70 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bosenAlt text-white mb-1 uppercase tracking-wide group-hover:text-white/90 transition-colors duration-300">
                      SANIMANI@GMAIL.COM
                    </h3>
                    <p className="text-white/40 text-sm md:text-base">
                      Let's create something that actually works.
                    </p>
                  </div>
                </div>
              </a>
            </div>

            {/* LinkedIn */}
            <div className="group">
              <a 
                href="https://linkedin.com/in/aamirnaqvi"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <svg className="w-8 h-8 text-white/70 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bosenAlt text-white mb-1 uppercase tracking-wide group-hover:text-white/90 transition-colors duration-300">
                      LINKEDIN
                    </h3>
                    <p className="text-white/40 text-sm md:text-base">
                      See how UX meets business - connect with me.
                    </p>
                  </div>
                </div>
              </a>
            </div>

            {/* Instagram */}
            <div className="group">
              <a 
                href="https://instagram.com/aamirnaqvi"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <svg className="w-8 h-8 text-white/70 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bosenAlt text-white mb-1 uppercase tracking-wide group-hover:text-white/90 transition-colors duration-300">
                      INSTAGRAM
                    </h3>
                    <p className="text-white/40 text-sm md:text-base">
                      Tap in for visuals with purpose. - follow the flow.
                    </p>
                  </div>
                </div>
              </a>
            </div>

          </div>
        </div>

        {/* Bottom Right Dot */}
        <div className="absolute bottom-8 right-8">
          <div className="w-3 h-3 bg-white/30 rounded-full"></div>
        </div>

        {/* Top Right "W." Text */}
        <div className="absolute top-8 right-8">
          <span className="text-white/20 font-bosenAlt text-lg tracking-wider">W.</span>
        </div>

        {/* Right Side "Nominate" Text */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 rotate-90">
          <span className="text-white/15 font-bosenAlt text-sm tracking-widest">NOMINATE</span>
        </div>
      </div>
    </div>
  );
}

export default App;