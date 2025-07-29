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
      <div id="contact-section" className="relative min-h-screen w-full bg-black z-10 overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite'
            }}
          />
        </div>

        {/* Random Lines for Contact Section */}
        <RandomLines count={30} className="z-10 opacity-20" />
        
        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute border border-white/10 rounded-full"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 15 + 10}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-20 min-h-screen flex items-center">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Left Side - Contact Info */}
              <div className="space-y-12">
                <div>
                  <h2 className="text-6xl md:text-8xl lg:text-9xl font-bosenAlt text-white mb-6 tracking-tight leading-none">
                    LET'S
                  </h2>
                  <h2 className="text-6xl md:text-8xl lg:text-9xl font-bosenAlt text-white/60 mb-8 tracking-tight leading-none">
                    TALK
                  </h2>
                  <p className="text-xl text-white/70 leading-relaxed max-w-lg">
                    Ready to bring your vision to life? Let's collaborate and create something extraordinary that resonates with your audience.
                  </p>
                </div>

                {/* Contact Methods */}
                <div className="space-y-8">
                  <div className="group cursor-pointer">
                    <div className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white/50 text-sm font-bosenAlt uppercase tracking-wide">Email</p>
                        <p className="text-white text-lg">hello@aamirnaqvi.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="group cursor-pointer">
                    <div className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white/50 text-sm font-bosenAlt uppercase tracking-wide">Phone</p>
                        <p className="text-white text-lg">+1 (555) 123-4567</p>
                      </div>
                    </div>
                  </div>

                  <div className="group cursor-pointer">
                    <div className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white/50 text-sm font-bosenAlt uppercase tracking-wide">Location</p>
                        <p className="text-white text-lg">New York, NY</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-6">
                  {['Instagram', 'LinkedIn', 'Behance', 'Vimeo'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-white/50 hover:text-white font-bosenAlt text-sm uppercase tracking-wide transition-all duration-300 hover:scale-110"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-3xl font-bosenAlt text-white mb-8 tracking-tight">
                  START A PROJECT
                </h3>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-white/70 font-bosenAlt text-xs uppercase tracking-wide">
                        Name *
                      </label>
                      <input
                        type="text"
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white/70 font-bosenAlt text-xs uppercase tracking-wide">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/70 font-bosenAlt text-xs uppercase tracking-wide">
                      Project Type
                    </label>
                    <select className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/20 text-white focus:outline-none focus:border-white/60 transition-all duration-300">
                      <option value="" className="bg-black">Select project type</option>
                      <option value="brand-video" className="bg-black">Brand Video</option>
                      <option value="commercial" className="bg-black">Commercial</option>
                      <option value="social-content" className="bg-black">Social Content</option>
                      <option value="documentary" className="bg-black">Documentary</option>
                      <option value="other" className="bg-black">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/70 font-bosenAlt text-xs uppercase tracking-wide">
                      Budget Range
                    </label>
                    <select className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/20 text-white focus:outline-none focus:border-white/60 transition-all duration-300">
                      <option value="" className="bg-black">Select budget range</option>
                      <option value="5k-10k" className="bg-black">$5K - $10K</option>
                      <option value="10k-25k" className="bg-black">$10K - $25K</option>
                      <option value="25k-50k" className="bg-black">$25K - $50K</option>
                      <option value="50k+" className="bg-black">$50K+</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/70 font-bosenAlt text-xs uppercase tracking-wide">
                      Project Details *
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-all duration-300 resize-none"
                      placeholder="Tell me about your vision, goals, and timeline..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-8 py-4 bg-white text-black font-bosenAlt text-sm uppercase tracking-wide hover:bg-white/90 transition-all duration-300 hover:scale-105 rounded-lg"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-20 pt-12 border-t border-white/10 text-center">
              <p className="text-white/50 font-bosenAlt text-sm uppercase tracking-wide mb-4">
                Response Time: Within 24 Hours
              </p>
              <div className="flex justify-center items-center space-x-8">
                <div className="text-center">
                  <p className="text-2xl font-bosenAlt text-white">100+</p>
                  <p className="text-white/50 text-xs uppercase tracking-wide">Projects</p>
                </div>
                <div className="w-px h-8 bg-white/20"></div>
                <div className="text-center">
                  <p className="text-2xl font-bosenAlt text-white">50+</p>
                  <p className="text-white/50 text-xs uppercase tracking-wide">Clients</p>
                </div>
                <div className="w-px h-8 bg-white/20"></div>
                <div className="text-center">
                  <p className="text-2xl font-bosenAlt text-white">5+</p>
                  <p className="text-white/50 text-xs uppercase tracking-wide">Years</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;