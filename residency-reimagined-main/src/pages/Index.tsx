import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { X, Leaf, Mountain, Home, Star, ArrowRight, CheckCircle, Menu, Phone, Mail, MapPin, Heart, Wind, Sun, Moon, Waves } from "lucide-react";
import { FaWifi, FaSnowflake, FaUtensils, FaCoffee, FaConciergeBell, FaPhone, FaEnvelope, FaMapMarkerAlt, FaTree, FaWater, FaMountain, FaSpa } from "react-icons/fa";

// Type definitions
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

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Simplified Preloader
  const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
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
      }, 50);

      return () => clearInterval(interval);
    }, [onComplete]);

    return (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
      >
        <div className="flex flex-col items-center space-y-8">
          <motion.div
            className="relative"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
              <Leaf className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <motion.div className="text-center">
            <h1 className="text-3xl font-bold gradient-text mb-2">Subramaniyam Residency</h1>
            <p className="text-lg text-gray-600">Nature's Sanctuary Awaits</p>
          </motion.div>

          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-teal-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-sm text-gray-500">
            {progress < 50 && "Preparing your experience..."}
            {progress >= 50 && progress < 100 && "Almost ready..."}
            {progress === 100 && "Welcome to paradise!"}
          </p>
        </div>
      </motion.div>
    );
  };

  // Modern Navigation
  const Navigation: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 20);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
      { label: "Discover", id: "hero" },
      { label: "Spaces", id: "spaces" },
      { label: "Essence", id: "amenities" },
      { label: "Exploration", id: "tours" },
      { label: "Gallery", id: "gallery" },
      { label: "Connect", id: "contact" },
    ];

    return (
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold gradient-text">Subramaniyam</span>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
                  className="text-gray-700 hover:text-green-600 transition-colors duration-300 relative group font-medium"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-teal-500 transition-all duration-300 group-hover:w-full rounded-full" />
                </motion.button>
              ))}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("spaces")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary shadow-lg hover:shadow-xl"
              >
                Book Now
              </motion.button>
            </div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200"
            >
              <div className="px-6 py-4 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-gray-700 hover:text-green-600 transition-colors font-medium"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    document.getElementById("spaces")?.scrollIntoView({ behavior: "smooth" });
                    setMobileMenuOpen(false);
                  }}
                  className="w-full btn-primary mt-4"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    );
  };

  // Unique Hero Section
  const Hero: React.FC = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const slides = [
      {
        title: "Embrace Nature's Embrace",
        subtitle: "Where every breath is fresh, every moment is peace",
        image: "bg-gradient-to-br from-green-200 via-teal-100 to-cyan-200",
      },
      {
        title: "Serene Sanctuary",
        subtitle: "Your personal retreat from the world's chaos",
        image: "bg-gradient-to-br from-teal-200 via-cyan-100 to-blue-200",
      },
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
      return () => clearInterval(interval);
    }, []);

    return (
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 animate-pulse-slow">
          <div className={slides[activeSlide].image} />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-20"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 30}%`,
              }}
            >
              {i % 4 === 0 ? (
                <Leaf className="w-8 h-8 text-green-600" />
              ) : i % 4 === 1 ? (
                <Waves className="w-6 h-6 text-teal-600" />
              ) : i % 4 === 2 ? (
                <Heart className="w-5 h-5 text-pink-400" />
              ) : (
                <Sun className="w-7 h-7 text-yellow-500" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 text-shadow"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="gradient-text">{slides[activeSlide].title.split(" ")[0]}</span>
              <br />
              <span className="text-gray-800">{slides[activeSlide].title.split(" ").slice(1).join(" ")}</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-12 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {slides[activeSlide].subtitle}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("spaces")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary text-lg px-8 py-4 shadow-2xl"
              >
                Discover Rooms
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("amenities")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-secondary text-lg px-8 py-4"
              >
                Explore Experience
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      </section>
    );
  };

  // Elegant About Section
  const About: React.FC = () => {
    const { elementRef: ref, isVisible } = useScrollReveal();

    return (
      <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
              transition={{ duration: 0.8 }}
              className="animate-slide-in-left"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                >
                  <Leaf className="w-4 h-4 mr-2" />
                  Nature's Luxury
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Where <span className="gradient-text">Nature</span> Meets Luxury
                </h2>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Subramaniyam Residency embodies the perfect harmony between modern comfort and
                  natural serenity. Our thoughtfully designed spaces invite you to reconnect with
                  nature while enjoying contemporary luxuries.
                </p>

                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text">500+</div>
                    <div className="text-gray-600">Happy Guests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text">98%</div>
                    <div className="text-gray-600">Satisfaction</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative animate-slide-in-right"
            >
              <div className="relative">
                <div className="grid grid-cols-1 gap-4">
                  <motion.div
                    className="aspect-square bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl p-8 flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Mountain className="w-20 h-20 text-white" />
                  </motion.div>

                  <motion.div
                    className="aspect-square bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl p-8 flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.05, rotate: -5 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Waves className="w-20 h-20 text-white" />
                  </motion.div>
                </div>

                {/* Floating Card */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-xl"
                  animate={{ rotate: [-2, 2, -2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </div>
                  <p className="text-sm font-medium mt-1">Exceptional Experience</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };

  // Interactive Spaces Section
  const Spaces: React.FC = () => {
    const { elementRef: headerRef, isVisible: headerVisible } = useScrollReveal();
    const { elementRef: spacesRef, isVisible: spacesVisible } = useScrollReveal();

    const spaces = [
      {
        id: 1,
        name: "Family Room",
        icon: Heart,
        features: ["King Size Bed (2)", "AC Available", "TV Included", "Sofa"],
        price: "₹5,000 (AC) / ₹4,000 (Non-AC)",
        description: "Perfect for families (4 adults + 2 children)",
        extraBed: "₹500 extra for additional bed",
        available: 2,
      },
      {
        id: 2,
        name: "Suite Room",
        icon: Home,
        features: ["King + Single Bed", "AC Available", "TV Included", "Coffee Maker"],
        price: "₹4,500 (AC) / ₹3,750 (Non-AC)",
        description: "Comfort for 3 adults + 1 child",
        available: 2,
      },
      {
        id: 3,
        name: "Standard Room",
        icon: Leaf,
        features: ["King Size Bed", "AC Available", "TV Included", "Room Heater"],
        price: "₹3,000 (AC) / ₹2,500 (Non-AC)",
        description: "Cozy space for 2 adults + 1 child",
        available: 18,
      },
    ];

    return (
      <section id="spaces" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 animate-slide-up"
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Home className="w-4 h-4 mr-2" />
              Signature Spaces
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Choose Your <span className="gradient-text">Sanctuary</span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each space is thoughtfully designed to offer unique experiences
              that celebrate nature's beauty and serenity.
            </p>
          </motion.div>

          {/* Spaces Grid */}
          <div ref={spacesRef} className="grid md:grid-cols-3 gap-8">
            {spaces.map((space, index) => {
              const Icon = space.icon;
              return (
                <motion.div
                  key={space.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: spacesVisible ? 1 : 0, y: spacesVisible ? 0 : 50 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  whileHover={{ y: -10 }}
                  className="card-hover group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-green-300 transition-all duration-500 shadow-lg hover:shadow-2xl"
                >
                  <div className="text-center mb-6">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{space.name}</h3>
                    <p className="text-lg font-semibold gradient-text mb-4">{space.price}</p>
                    <p className="text-gray-600 mb-6">{space.description}</p>
                  </div>

                  <div className="space-y-3">
                    {space.features.map((feature, i) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/booking')}
                    className="w-full mt-6 btn-primary"
                  >
                    Reserve Now
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  // Modern Amenities Section
  const Amenities: React.FC = () => {
    const { elementRef: ref, isVisible } = useScrollReveal();

    const amenities = [
      { icon: FaConciergeBell, title: "24/7 Service Desk", description: "Round-the-clock assistance and concierge" },
      { icon: FaSnowflake, title: "AC/Non-AC Options", description: "Choose comfortable climate control" },
      { icon: FaMountain, title: "TV in Rooms", description: "Entertainment and local channels" },
      { icon: FaCoffee, title: "Tea/Coffee Maker", description: "Complimentary hot beverages" },
      { icon: FaWifi, title: "Free Wi-Fi", description: "High-speed internet throughout property" },
      { icon: FaSpa, title: "Room Heater", description: "Warm comfort during cool evenings" },
    ];

    return (
      <section id="amenities" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Waves className="w-4 h-4 mr-2" />
              Living Essence
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Curated <span className="gradient-text">Experiences</span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every detail is thoughtfully designed to enhance your connection
              with nature and elevate your senses.
            </p>
          </motion.div>

          <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={isVisible ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-green-300 transition-all duration-500 hover:shadow-xl"
              >
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-14 h-14 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 15 }}
                  >
                    <amenity.icon className="w-7 h-7 text-white" />
                  </motion.div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{amenity.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{amenity.description}</p>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  initial={false}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Exploration Section
  const Tours: React.FC = () => {
    const { elementRef: ref, isVisible } = useScrollReveal();

    const destinations = [
      {
        name: "Ramanashram",
        distance: "2 km",
        duration: "2-3 hours",
        difficulty: "Easy",
        highlights: ["Spiritual retreat", "Ramana Maharshi teachings", "Peaceful meditation"],
      },
      {
        name: "Arunachaleshwarar Temple",
        distance: "3 km",
        duration: "3-4 hours",
        difficulty: "Easy",
        highlights: ["Ancient temple", "Spiritual significance", "Cultural heritage"],
      },
      {
        name: "Sathanur Dam",
        distance: "25 km",
        duration: "4-5 hours",
        difficulty: "Easy",
        highlights: ["Scenic reservoir", "Photography", "Nature walks"],
      },
      {
        name: "Kandhashramam",
        distance: "5 km",
        duration: "2-3 hours",
        difficulty: "Moderate",
        highlights: ["Bird sanctuary", "Nature reserve", "Wildlife viewing"],
      },
    ];

    return (
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              <Mountain className="w-4 h-4 mr-2" />
              Nature Adventures
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Explore Beyond <span className="gradient-text">Boundaries</span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the natural wonders and spiritual landmarks that surround our sanctuary.
            </p>
          </motion.div>

          <div ref={ref} className="grid md:grid-cols-3 gap-8">
            {destinations.map((dest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-gray-200 hover:border-blue-300 transition-all duration-500 card-hover">
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                      dest.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      dest.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {dest.difficulty}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{dest.name}</h3>
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <span>{dest.distance}</span>
                      <span>{dest.duration}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <p className="font-semibold text-gray-900 mb-2">Highlights:</p>
                    {dest.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center space-x-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-medium"
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Gallery Section
  const Gallery: React.FC = () => {
    // Simplified gallery for this unique design
    return (
      <section id="gallery" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Moments <span className="gradient-text">Captured</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                className="aspect-square bg-gradient-to-br from-green-200 to-teal-300 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    {i % 4 === 0 ? <Leaf className="w-6 h-6 text-white" /> :
                     i % 4 === 1 ? <Mountain className="w-6 h-6 text-white" /> :
                     i % 4 === 2 ? <Waves className="w-6 h-6 text-white" /> :
                     <Heart className="w-6 h-6 text-white" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Contact Section
  const Contact: React.FC = () => {
    const { elementRef: ref, isVisible } = useScrollReveal();
    const [showForm, setShowForm] = useState(false);

    return (
      <section id="contact" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Begin Your <span className="gradient-text">Journey</span>
            </h2>

            <p className="text-xl text-gray-600 mb-8">
              Ready to experience nature's luxury? Let's connect and make your stay unforgettable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(!showForm)}
                className="btn-primary px-8 py-4 text-lg"
              >
                Connect With Us
              </motion.button>
            </div>
          </motion.div>

          <AnimatePresence>
            {showForm && (
              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Let's Get In Touch</h3>
                  <p className="text-gray-600">We're here to make your experience extraordinary</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold mb-1">Call Us</h4>
                    <p className="text-gray-600 text-sm">+91 98765 43210</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-1">Email Us</h4>
                    <p className="text-gray-600 text-sm">hello@subramaniyam.com</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-3">
                      <MapPin className="w-6 h-6 text-teal-600" />
                    </div>
                    <h4 className="font-semibold mb-1">Visit Us</h4>
                    <p className="text-gray-600 text-sm">Tiruvannamalai, TN</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
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
          <Spaces />
          <Amenities />
          <Tours />
          <Gallery />
          <Contact />

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-16 px-6">
            <div className="container mx-auto max-w-6xl">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-2xl font-bold">Subramaniyam Residency</span>
                  </div>
                  <p className="text-gray-300 mb-6">
                    Where nature meets luxury in perfect harmony. Experience the serenity
                    of Tiruvannamalai's natural beauty.
                  </p>
                  <div className="flex space-x-4">
                    {['facebook', 'instagram', 'twitter'].map((social) => (
                      <motion.div
                        key={social}
                        whileHover={{ scale: 1.1 }}
                        className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors"
                      >
                        <div className="w-5 h-5 bg-white rounded-sm"></div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2">
                    {['Discover', 'Spaces', 'Essence', 'Exploration', 'Gallery', 'Connect'].map((link) => (
                      <li key={link}>
                        <a href={`#${link.toLowerCase()}`} className="text-gray-300 hover:text-white transition-colors">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Support</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Support</a></li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-8 text-center mt-12">
                <p className="text-gray-400">
                  © 2025 Subramaniyam Residency. Embracing nature's beauty, one guest at a time.
                </p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default Index;
