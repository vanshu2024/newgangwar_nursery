import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { BsFlower1, BsShieldCheck, BsTruck, BsTree, BsArrowRight, BsStarFill, BsChevronLeft, BsChevronRight, BsSend, BsWhatsapp, BsHouseDoor, BsEmojiSmile, BsClockHistory, BsShop, BsCart3 } from 'react-icons/bs';
import { toast } from 'react-toastify';
import API from '../api/axios';
import PlantCard from '../components/PlantCard';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const SectionTitle = ({ title, highlight, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="section-title">
      {title} <span className="gradient-text">{highlight}</span>
    </h2>
    {subtitle && <p className="section-subtitle">{subtitle}</p>}
  </div>
);

const AnimatedNumbers = ({ value, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = Number(value) / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= Number(value)) {
        setCount(Number(value));
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const FloatingLeaf = ({ className }) => (
  <div className={`absolute text-white/10 ${className}`}>
    <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20c4 0 6-2 9-7 0 0-3 1-5 1s-3-1-3-1c2-3 5-5 8-5z"/>
    </svg>
  </div>
);

const categoryShowcase = [
  { name: 'Indoor Plants', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&q=80', count: '25+ Varieties' },
  { name: 'Flowering Plants', image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400&q=80', count: '30+ Varieties' },
  { name: 'Fruit Plants', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&q=80', count: '15+ Varieties' },
  { name: 'Medicinal Plants', image: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=400&q=80', count: '20+ Varieties' },
  { name: 'Bonsai Plants', image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&q=80', count: '10+ Varieties' },
  { name: 'Outdoor Plants', image: 'https://images.unsplash.com/photo-1557180295-76aea20af816?w=400&q=80', count: '40+ Varieties' },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [heroText, setHeroText] = useState(0);

  const heroRef = useRef(null);
  const introRef = useRef(null);
  const featuredRef = useRef(null);
  const whyRef = useRef(null);
  const stepsRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const introInView = useInView(introRef, { once: true, margin: '-100px' });
  const featuredInView = useInView(featuredRef, { once: true, margin: '-100px' });
  const whyInView = useInView(whyRef, { once: true, margin: '-100px' });
  const stepsInView = useInView(stepsRef, { once: true, margin: '-100px' });

  const heroLines = [
    'Bringing Nature Closer to Your Home',
    'Premium Plants, Delivered with Care',
    'Your Trusted Nursery in Farrukhabad',
  ];

  useEffect(() => {
    API.get('/plants/featured').then(({ data }) => setFeatured(data)).catch(() => {});
    API.get('/plants/bestsellers').then(({ data }) => setBestsellers(data)).catch(() => {});
    API.get('/plants/new-arrivals').then(({ data }) => setNewArrivals(data)).catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroText((prev) => (prev + 1) % heroLines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    { name: 'Rahul Sharma', text: 'Excellent quality plants! The delivery was on time and all plants were healthy. Highly recommend New Gangwar Nursery.', rating: 5, location: 'Farrukhabad' },
    { name: 'Priya Verma', text: 'Beautiful collection of indoor plants. The staff was very helpful in suggesting the right plants for my home.', rating: 5, location: 'Kaimganj' },
    { name: 'Amit Kumar', text: 'Best nursery in Farrukhabad! Great variety of fruit plants at reasonable prices.', rating: 5, location: 'Farrukhabad' },
    { name: 'Neha Singh', text: 'I ordered medicinal plants for my garden. They are growing wonderfully. Thank you New Gangwar Nursery!', rating: 4, location: 'Shahjahanpur' },
  ];

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
    }
  };

  const nextTestimonial = () => setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-800 to-emerald-900" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-primary-200 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />

        <FloatingLeaf className="top-20 left-[10%] animate-pulse" style={{ animationDuration: '3s' }} />
        <FloatingLeaf className="top-40 right-[15%] animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <FloatingLeaf className="bottom-32 left-[20%] animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '2s' }} />

        <motion.div
          initial="hidden"
          animate={heroInView ? 'visible' : 'hidden'}
          variants={stagger}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-sm mb-8 border border-white/10">
            <BsFlower1 className="text-primary-300" />
            Welcome to New Gangwar Nursery
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight min-h-[1.2em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={heroText}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                {heroLines[heroText].split(' ').map((word, i) =>
                  word === 'Closer' || word === 'Farrukhabad' || word === 'Care'
                    ? <span key={i} className="text-primary-300"> {word} </span>
                    : ` ${word} `
                )}
              </motion.span>
            </AnimatePresence>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover a wide range of premium plants — from indoor greens to flowering beauties — nurtured with care in Farrukhabad. Your green journey starts here.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/plants" className="group btn-primary text-lg px-8 py-4 flex items-center gap-2 shadow-lg shadow-primary-500/30">
              Explore Plants <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="https://wa.me/919452437164" target="_blank" rel="noopener noreferrer" className="btn-outline border-white/30 text-white hover:bg-white/10 hover:border-white/50 flex items-center gap-2 text-lg px-8 py-4">
              <BsWhatsapp className="text-green-400" /> Chat with Us
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <BsChevronDown className="text-white/50 text-2xl" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-16 z-20 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200 dark:divide-gray-800 overflow-hidden"
        >
          {[
            { icon: BsEmojiSmile, value: '1000', suffix: '+', label: 'Happy Customers' },
            { icon: BsTree, value: '200', suffix: '+', label: 'Plant Varieties' },
            { icon: BsClockHistory, value: '10', suffix: '+', label: 'Years Experience' },
            { icon: BsShop, value: '50', suffix: '+', label: 'Villages Served' },
          ].map((stat, i) => (
            <div key={i} className="p-6 text-center">
              <div className="inline-flex p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-3">
                <stat.icon className="text-xl" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                <AnimatedNumbers value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Category Showcase */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Browse by" highlight="Category" subtitle="Find the perfect plants for your space" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {categoryShowcase.map((cat, i) => (
              <motion.div key={cat.name} variants={fadeInUp}>
                <Link
                  to={`/plants?category=${encodeURIComponent(cat.name)}`}
                  className="group block glass-card overflow-hidden hover:-translate-y-2"
                >
                  <div className="aspect-square overflow-hidden">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">{cat.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{cat.count}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={stepsRef} className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="How It" highlight="Works" subtitle="Three simple steps to get your plants" />
          <motion.div
            initial="hidden"
            animate={stepsInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: BsCart3, step: '01', title: 'Browse & Select', desc: 'Explore our wide range of plants and select your favorites from our catalog.' },
              { icon: BsWhatsapp, step: '02', title: 'Place Your Order', desc: 'Contact us via WhatsApp or phone with your selection and delivery details.' },
              { icon: BsTruck, step: '03', title: 'Fast Delivery', desc: 'Get your plants delivered fresh to your doorstep with expert care tips.' },
            ].map((item, i) => (
              <motion.div key={item.title} variants={fadeInUp} className="relative glass-card p-8 text-center group hover:-translate-y-2">
                <div className="absolute top-4 right-4 text-6xl font-bold text-gray-100 dark:text-gray-800/50 select-none">{item.step}</div>
                <div className="inline-flex p-4 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4 group-hover:scale-110 transition-transform duration-300 relative">
                  <item.icon className="text-3xl" />
                </div>
                <h3 className="text-lg font-semibold mb-2 relative">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm relative">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Plants */}
      <section ref={featuredRef} className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Featured" highlight="Plants" subtitle="Handpicked premium plants for your home and garden" />
          <motion.div
            initial="hidden"
            animate={featuredInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featured.slice(0, 4).map((plant, i) => (
              <motion.div key={plant._id} variants={fadeInUp}>
                <PlantCard plant={plant} />
              </motion.div>
            ))}
          </motion.div>
          {featured.length > 4 && (
            <motion.div variants={fadeInUp} className="text-center mt-10">
              <Link to="/plants" className="btn-outline inline-flex items-center gap-2 group">
                View All Plants <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Best Sellers */}
      {bestsellers.length > 0 && (
        <section className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle title="Best" highlight="Sellers" subtitle="Most popular plants loved by our customers" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestsellers.slice(0, 4).map((plant) => (
                <PlantCard key={plant._id} plant={plant} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle title="New" highlight="Arrivals" subtitle="Fresh new plants added to our collection" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.slice(0, 4).map((plant) => (
                <PlantCard key={plant._id} plant={plant} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section ref={whyRef} className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Why Choose" highlight="Us" subtitle="What makes us your preferred plant nursery" />
          <motion.div
            initial="hidden"
            animate={whyInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: BsTree, title: 'Premium Quality', desc: 'Handpicked, healthy plants nurtured with care and expertise.' },
              { icon: BsShieldCheck, title: '100% Fresh', desc: 'We guarantee fresh, pest-free plants delivered to your doorstep.' },
              { icon: BsTruck, title: 'Fast Delivery', desc: 'Safe and timely delivery across Farrukhabad and nearby areas.' },
              { icon: BsFlower1, title: 'Expert Guidance', desc: 'Get personalized plant care tips from our experienced team.' },
            ].map((item, i) => (
              <motion.div key={item.title} variants={fadeInUp} className="glass-card p-6 text-center group hover:-translate-y-1">
                <div className="inline-flex p-4 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="text-3xl" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-primary-900 to-emerald-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary-300 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-300 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle title="What Our" highlight="Customers Say" subtitle="Hear from our happy customers" />
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="glass-card p-8 md:p-12 max-w-2xl mx-auto"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                    <BsStarFill key={i} className="text-yellow-400 text-xl mx-0.5" />
                  ))}
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                  "{testimonials[testimonialIndex].text}"
                </p>
                <div className="w-16 h-0.5 bg-primary-500 mx-auto mb-4 rounded-full" />
                <p className="font-semibold text-gray-900 dark:text-white">{testimonials[testimonialIndex].name}</p>
                <p className="text-sm text-gray-500">{testimonials[testimonialIndex].location}</p>
              </motion.div>
            </AnimatePresence>
            <button onClick={prevTestimonial} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all text-gray-600 dark:text-gray-300 hover:text-primary-600">
              <BsChevronLeft />
            </button>
            <button onClick={nextTestimonial} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all text-gray-600 dark:text-gray-300 hover:text-primary-600">
              <BsChevronRight />
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === testimonialIndex ? 'bg-primary-400 w-8' : 'bg-white/30 w-2.5 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle title="Subscribe to Our" highlight="Newsletter" subtitle="Get updates on new plants, seasonal offers, and gardening tips" />
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleNewsletter}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="input-field flex-1"
            />
            <button type="submit" className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap group">
              <BsSend className="group-hover:translate-x-1 transition-transform" /> Subscribe
            </button>
          </motion.form>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Bring Nature Home?
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Visit our nursery or browse our collection online. We are here to help you find the perfect plants for your home and garden.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Contact Us
              </Link>
              <a href="tel:9452437164" className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300">
                Call 9452437164
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const BsChevronDown = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
);

export default Home;
