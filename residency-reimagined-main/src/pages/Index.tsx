import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { X } from "lucide-react";
import { FaWifi, FaParking, FaSnowflake, FaUtensils, FaCoffee, FaDumbbell, FaSwimmingPool, FaConciergeBell, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaBuilding, FaChurch, FaSkyatlas, FaGopuram, FaCar, FaBroom } from "react-icons/fa";

import hero1 from "@/assets/hero-1.jpeg";
import hero2 from "@/assets/hero-2.jpeg";
import deluxeBalcony from "@/assets/deluxe-balcony.jpeg";
import deluxeBalcony2 from "@/assets/deluxe-balcony-2.jpg";
import deluxeBalcony3 from "@/assets/deluxe-balcony-3.jpeg";
import deluxeBalcony4 from "@/assets/deluxe-balcony-4.jpg";
import deluxeBalcony5 from "@/assets/deluxe-balcony-5.jpg";
import executiveBalcony from "@/assets/executive-balcony.jpeg";
import executiveBalcony2 from "@/assets/executive-balcony-2.jpeg";
import executiveBalcony3 from "@/assets/executive-balcony-3.jpeg";
import executiveBalcony4 from "@/assets/executive-balcony-4.jpeg";
import executiveBalcony5 from "@/assets/executive-balcony-5.jpg";
import familyBalcony from "@/assets/family-balcony.jpg";
import familyBalcony2 from "@/assets/family-balcony-2.jpg";
import familyBalcony3 from "@/assets/family-balcony-3.jpg";
import familyBalcony4 from "@/assets/family-balcony-4.jpg";
import familyBalcony5 from "@/assets/family-balcony-5.jpg";
import presidentialBalcony from "@/assets/presidential-balcony.jpg";
import presidentialBalcony2 from "@/assets/presidential-balcony-2.jpg";
import presidentialBalcony3 from "@/assets/presidential-balcony-3.jpg";
import presidentialBalcony4 from "@/assets/presidential-balcony-4.jpg";
import presidentialBalcony5 from "@/assets/presidential-balcony-5.jpg";
import standardRoom from "@/assets/standard-room.jpg";
import standardRoom2 from "@/assets/standard-room-2.jpg";
import standardRoom3 from "@/assets/standard-room-3.jpg";
import standardRoom4 from "@/assets/standard-room-4.jpg";
import standardRoom5 from "@/assets/standard-room-5.jpg";
import economyRoom from "@/assets/economy-room.jpg";
import economyRoom2 from "@/assets/economy-room-2.jpg";
import economyRoom3 from "@/assets/economy-room-3.jpg";
import economyRoom4 from "@/assets/economy-room-4.jpg";
import economyRoom5 from "@/assets/economy-room-5.jpg";

// Simple in-file replacement for ../hooks/useScrollReveal
type UseScrollRevealOptions = {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
};

const useScrollReveal = (options?: UseScrollRevealOptions) => {
  const { threshold = 0.15, root = null, rootMargin = "0px" } = options || {};
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, root, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, root, rootMargin]);

  return { elementRef: elementRef as React.RefObject<HTMLDivElement>, isVisible };
};

// Simple inline RoomCarousel component to avoid external module resolution issues
const RoomCarousel = ({ images, roomName }: { images: string[]; roomName: string }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % images.length), 4000);
    return () => clearInterval(id);
  }, [images]);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="relative h-64">
      <img
        src={images[current]}
        alt={roomName}
        className="w-full h-64 object-cover rounded-t-lg"
      />
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <button
          type="button"
          onClick={prev}
          className="p-2 bg-black/30 text-white rounded-full focus:outline-none"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={next}
          className="p-2 bg-black/30 text-white rounded-full focus:outline-none"
        >
          ›
        </button>
      </div>
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full ${current === i ? "bg-accent" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Preloader Component
  const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(onComplete, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 30);

      return () => clearInterval(interval);
    }, [onComplete]);

    return (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{
          background: "linear-gradient(180deg, hsl(240, 25%, 6%), hsl(240, 43%, 10%))",
        }}
      >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
              Subramaniyam Residency
            </h1>
            <p className="text-xl text-muted-foreground mb-8">Welcome to Luxury</p>

            <div className="relative w-24 h-24 mx-auto mb-6">
              <svg
                className="w-24 h-24 transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted opacity-20"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="url(#gradient-gold-blue)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{
                    strokeDasharray: 283,
                    strokeDashoffset: 283 * (1 - progress / 100)
                  }}
                />
                <defs>
                  <linearGradient id="gradient-gold-blue" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold gradient-text">{progress}%</span>
              </div>
            </div>
          </motion.div>
      </motion.div>
    );
  };

  // Navigation Component
  const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
      }
    };

    const navItems = [
      { label: "Home", id: "hero" },
      { label: "Rooms", id: "rooms" },
      { label: "Amenities", id: "amenities" },
      { label: "Tours", id: "tours" },
      { label: "Gallery", id: "gallery" },
      { label: "Contact", id: "contact" },
    ];

    return (
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-card/95 backdrop-blur-lg shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold gradient-text cursor-pointer"
              onClick={() => scrollToSection("hero")}
            >
              Subramaniyam Residency
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-foreground hover:text-accent transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              <button
                onClick={() => scrollToSection("rooms")}
                className="bg-primary hover:bg-primary-glow text-primary-foreground hover-glow-blue px-6 py-3 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-2 text-foreground hover:text-accent transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("rooms")}
                className="w-full bg-primary hover:bg-primary-glow text-primary-foreground px-4 py-3 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Book Now
              </button>
            </motion.div>
          )}
        </div>
      </motion.nav>
    );
  };

  // Hero Component
  const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
      {
        image: hero1,
        title: "Discover Timeless Elegance",
        subtitle: "Where Heritage Meets Luxury - A Sanctuary of Tranquility & Grace",
      },
      {
        image: hero2,
        title: "Refined Perfection",
        subtitle: "Experience Unparalleled Hospitality in the Heart of Spirituality",
      },
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }, [slides.length]);

    const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    return (
      <section id="hero" className="relative h-screen w-full overflow-hidden">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.1,
            }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
        ))}

        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.h1
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold mb-4 gradient-text"
            >
              {slides[currentSlide].title}
            </motion.h1>
            <motion.p
              key={`subtitle-${currentSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl md:text-2xl text-foreground mb-8"
            >
              {slides[currentSlide].subtitle}
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection("rooms")}
                className="bg-primary hover:bg-primary-glow text-primary-foreground hover-glow-purple text-lg px-8 py-6 rounded-md transition-all duration-300"
              >
                Explore Rooms
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground text-lg px-8 py-6 rounded-md transition-all duration-300 border"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-accent w-8" : "bg-foreground/50"
              }`}
            />
          ))}
        </div>
      </section>
    );
  };

  // About Component
  const About = () => {
    const { elementRef: ref, isVisible } = useScrollReveal();

    return (
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center scroll-reveal"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              About Subramaniyam Residency
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Located in the heart of vibrant communities, Subramaniyam Residency offers
              an exceptional blend of modern luxury and traditional hospitality. Our premium
              accommodations are designed to provide guests with an unforgettable experience,
              combining elegant interiors with world-class amenities.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you're visiting for business, pleasure, or special occasions, our
              dedicated team ensures every moment of your stay is filled with comfort and
              sophistication. Experience the perfect harmony of luxury and serenity at
              Subramaniyam Residency.
            </p>
          </motion.div>
        </div>
      </section>
    );
  };

  // Rooms Component
  const Rooms = () => {
    const { elementRef: ref, isVisible } = useScrollReveal();
    const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal();

    const rooms = [
      {
        id: 1,
        name: "Standard Room",
        images: [standardRoom, standardRoom2, standardRoom3, standardRoom4, standardRoom5],
        price: "Placeholder Price",
        description: "Comfortable and cozy standard room for a pleasant stay.",
        features: ["Comfort", "Clean", "Essential Amenities"],
      },
      {
        id: 2,
        name: "Deluxe Room",
        images: [deluxeBalcony, deluxeBalcony2, deluxeBalcony3, deluxeBalcony4, deluxeBalcony5],
        price: "Placeholder Price",
        description: "Premium deluxe room with additional space and amenities.",
        features: ["Premium Comfort", "Extra Space", "Enhanced Amenities"],
      },
      {
        id: 3,
        name: "Executive Suite",
        images: [executiveBalcony, executiveBalcony2, executiveBalcony3, executiveBalcony4, executiveBalcony5],
        price: "Placeholder Price",
        description: "Executive suite perfect for business travelers and extended stays.",
        features: ["Executive Comfort", "Work Space", "Business Amenities"],
      },
    ];

    return (
      <section id="rooms" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 scroll-reveal"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Our Rooms & Suites
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our selection of elegantly designed rooms and suites, each crafted
              to provide maximum comfort and luxury.
            </p>
          </motion.div>

          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`overflow-hidden bg-card border border-border hover-glow-purple rounded-lg scroll-reveal ${
                  isVisible ? 'scroll-visible' : ''
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <RoomCarousel images={room.images} roomName={room.name} />
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold z-10">
                    {room.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-foreground text-xl font-semibold mb-2">{room.name}</h3>
                  <p className="text-muted-foreground mb-4">
                    {room.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate('/booking')}
                    className="w-full bg-primary hover:bg-primary-glow text-primary-foreground hover-glow-purple px-4 py-2 rounded-md transition-all duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Amenities Component
  const Amenities = () => {
    const { elementRef: ref, isVisible } = useScrollReveal();
    const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal();

    const amenities = [
      { icon: FaConciergeBell, title: "24/7 Concierge", description: "Round-the-clock assistance for all your needs" },
      { icon: FaBroom, title: "Room Service", description: "24-hour in-room dining service at your convenience" },
      { icon: FaSnowflake, title: "Power Backup", description: "Uninterrupted power supply with backup generators" },
      { icon: FaPhone, title: "Security", description: "24/7 security with trained personnel and surveillance" },
      { icon: FaWifi, title: "Wi-Fi", description: "High-speed wireless internet access throughout the property" },
      { icon: FaCar, title: "Free Parking", description: "Secure and convenient parking facilities for guests" },
      { icon: FaSkyatlas, title: "Terrace View", description: "Stunning terrace views overlooking the surrounding landscape" },
      { icon: FaGopuram, title: "Near to Temple", description: "Conveniently located close to sacred temples and spiritual sites" },
    ];

    return (
      <section id="amenities" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 scroll-reveal"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              World-Class Amenities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Indulge in our comprehensive range of facilities designed to make your stay
              comfortable and memorable.
            </p>
          </motion.div>

          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className={`bg-card border border-border rounded-lg p-6 text-center hover-glow-purple group scroll-reveal ${
                  isVisible ? 'scroll-visible' : ''
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                  style={{
                    background: "var(--gradient-blue-white)",
                  }}
                >
                  <amenity.icon className="text-3xl text-primary-foreground" />
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {amenity.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {amenity.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Tours Component
  const Tours = () => {
    const { elementRef: ref, isVisible } = useScrollReveal();
    const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal();

    const tours = [
      {
        id: 1,
        name: "Arunachaleswarar Temple",
        distance: "2 km",
        description: "Ancient Hindu temple dedicated to Lord Shiva, one of the Pancha Bhoota Stalas representing fire.",
        highlights: ["Spiritual significance", "Ancient architecture", "Daily rituals"],
      },
      {
        id: 2,
        name: "Girivalam Path",
        distance: "14 km circuit",
        description: "Sacred circumambulation path around Arunachala Hill, walked by thousands of devotees.",
        highlights: ["Spiritual walk", "Scenic views", "Temple stops"],
      },
      {
        id: 3,
        name: "Ramana Maharshi Ashram",
        distance: "3 km",
        description: "Peaceful ashram of the renowned sage Ramana Maharshi, a center for meditation and self-inquiry.",
        highlights: ["Meditation center", "Peaceful atmosphere", "Spiritual teachings"],
      },
      {
        id: 4,
        name: "Sathanur Dam",
        distance: "25 km",
        description: "Beautiful reservoir with scenic views, perfect for picnics and nature photography.",
        highlights: ["Scenic beauty", "Water activities", "Photography"],
      },
    ];

    return (
      <section id="tours" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 scroll-reveal"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Nearby Attractions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the spiritual and natural wonders around Tiruvannamalai during your stay.
            </p>
          </motion.div>

          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`bg-card border border-border hover-glow-blue h-full rounded-lg p-6 scroll-reveal ${
                  isVisible ? 'scroll-visible' : ''
                }`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-foreground text-2xl font-semibold">{tour.name}</h3>
                  <span className="text-accent font-semibold text-sm bg-accent/10 px-3 py-1 rounded-full">
                    {tour.distance}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">
                  {tour.description}
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">Highlights:</p>
                  <ul className="space-y-1">
                    {tour.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center">
                        <span className="w-2 h-2 rounded-full bg-accent mr-2" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Gallery Component
  const Gallery = () => {
    const { elementRef: ref, isVisible } = useScrollReveal();
    const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal();

    const images = [
      hero1,
      hero2,
      deluxeBalcony,
      executiveBalcony,
      familyBalcony,
      presidentialBalcony,
    ];

    return (
      <section id="gallery" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 scroll-reveal"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Gallery
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Glimpse into the luxury and elegance that awaits you at Subramaniyam Residency.
            </p>
          </motion.div>

          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className={`relative h-64 overflow-hidden rounded-lg cursor-pointer group scroll-reveal ${
                  isVisible ? 'scroll-visible' : ''
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-foreground font-semibold">Subramaniyam Residency</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Contact Component
  const Contact = () => {
    const { elementRef: ref, isVisible } = useScrollReveal();
    const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal();
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitMessage("");

      try {
        // Simulate form submission (you can replace this with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast.success("Thank you! We'll get back to you soon.");
        setSubmitMessage("Thank you for contacting us! We'll get back to you within 24 hours.");
        setFormData({ name: "", email: "", phone: "", message: "" });

        // Clear success message after 5 seconds
        setTimeout(() => setSubmitMessage(""), 5000);
      } catch (error) {
        toast.error("Failed to send message. Please try again.");
        setSubmitMessage("Failed to send message. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      // reduced vertical spacing so header + map/form fit better on screen
      <section id="contact" className="py-12 px-4">
        <div className="container mx-auto">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 scroll-reveal"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2 gradient-text">
              Contact Us
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Have questions or need assistance? We're here to help make your stay exceptional.
            </p>
          </motion.div>

          <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${isVisible ? 'scroll-visible' : ''}`}>
            {/* Google Maps - slightly reduced height to fit better */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-1"
            >
              {/* Map height uses viewport units to fit screen: mobile 40vh, large screens 60vh */}
              <div className="rounded-lg overflow-hidden h-[40vh] lg:h-[80vh] border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1208.7616621421164!2d79.07363723495936!3d12.229721722062825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bacc177aa9554ab%3A0xcf9414977c2c1018!2sSiva%20Subramaniyar%20Residency!5e1!3m2!1sen!2sin!4v1763486870042!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

            {/* Contact Form - info cards condensed, form padding reduced */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-2"
            >
              {/* Contact Information Cards - compact */}
              <div className="space-y-3 mb-4">
                <a
                  href="https://maps.google.com/?q=123+Temple+Road,+Near+Arunachaleswarar+Temple,+Tiruvannamalai,+Tamil+Nadu+606601"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-card border border-border rounded-lg p-3 hover-glow-purple transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-blue-white)" }}>
                      <FaMapMarkerAlt className="text-sm text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground mb-0.5">Address</h3>
                      <p className="text-xs text-muted-foreground leading-tight hover:text-accent transition-colors">
                        107, Ramalinganar St, Tiruvennanallur, <br />Tiruvannamalai, Tamil Nadu 606601
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href="tel:+919876543210"
                  className="block bg-card border border-border rounded-lg p-3 hover-glow-purple transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-blue-white)" }}>
                      <FaPhone className="text-sm text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground mb-0.5">Phone</h3>
                      <p className="text-xs text-muted-foreground leading-tight hover:text-accent transition-colors">
                        +91 98765 43210
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:info@kousthubamgrand.com"
                  className="block bg-card border border-border rounded-lg p-3 hover-glow-purple transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "var(--gradient-blue-white)" }}>
                      <FaEnvelope className="text-sm text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-foreground mb-0.5">Email</h3>
                      <p className="text-xs text-muted-foreground leading-tight hover:text-accent transition-colors">
                        info@kousthubamgrand.com
                      </p>
                    </div>
                  </div>
                </a>
              </div>

              {/* Success Message */}
              {submitMessage && (
                <div className={`mb-4 p-3 rounded-lg border ${
                  submitMessage.includes('Thank you')
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                }`}>
                  <p className="text-sm font-medium">{submitMessage}</p>
                </div>
              )}

              {/* Submit Button Loading State */}
              {isSubmitting && (
                <div className="flex justify-center mb-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-4 space-y-4 min-h-[20rem] lg:min-h-[28rem]">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-2 py-2 bg-background border border-border text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-2 py-2 bg-background border border-border text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-2 py-2 bg-background border border-border text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-2 py-2 bg-background border border-border text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring min-h-24 resize-none text-sm"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-glow text-primary-foreground hover-glow-purple px-3 py-2 rounded-md transition-all duration-300 font-medium text-sm"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };
// ...existing code...

  // Footer Component
  const Footer = () => {
    return (
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-4">
                Subramaniyam Residency
              </h3>
              <p className="text-muted-foreground">
                Experience luxury and comfort in vibrant communities.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#rooms" className="text-muted-foreground hover:text-accent transition-colors">
                    Rooms & Suites
                  </a>
                </li>
                <li>
                  <a href="#amenities" className="text-muted-foreground hover:text-accent transition-colors">
                    Amenities
                  </a>
                </li>
                <li>
                  <a href="#tours" className="text-muted-foreground hover:text-accent transition-colors">
                    Nearby Tours
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-muted-foreground hover:text-accent transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-secondary hover:bg-primary transition-colors flex items-center justify-center">
                  <FaFacebook className="text-foreground" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-secondary hover:bg-primary transition-colors flex items-center justify-center">
                  <FaInstagram className="text-foreground" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-secondary hover:bg-primary transition-colors flex items-center justify-center">
                  <FaTwitter className="text-foreground" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-secondary hover:bg-primary transition-colors flex items-center justify-center">
                  <FaLinkedin className="text-foreground" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center">
            <p className="text-muted-foreground">
              © 2025 Subramaniyam Residency. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen">
          <Navigation />
          <Hero />
          <About />
          <Rooms />
          <Amenities />
          <Tours />
          <Gallery />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
