//Taimoor About, contact, blog pages
import { useState, useEffect, useRef } from 'react';
import {
  Leaf,
  Target,
  Truck,
  ShieldCheck,
  Award,
  User,
  Users,
} from 'lucide-react';

import tomatoImg from '../assets/images/tomato.png';
import carrotImg from '../assets/images/carrot.png';
import broccoliImg from '../assets/images/broccoli.png';
import spinachImg from '../assets/images/cat-eggplant.png';
import cucumberImg from '../assets/images/cat-cauliflower.png';

// Animated counter hook
const useCounter = (end, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const numericEnd = parseInt(end.replace(/\D/g, ''));
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * numericEnd));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
};

const STATS = [
  { value: '500+', label: 'Happy Customers', suffix: '+' },
  { value: '50+', label: 'Vegetables', suffix: '+' },
  { value: '100%', label: 'Organic', suffix: '%' },
  { value: '2', label: 'Countries', suffix: '' },
];

const TEAM = [
  { name: 'Ahmad Ali', role: 'Founder & CEO', gender: 'male' },
  { name: 'Sara Khan', role: 'Head of Operations', gender: 'female' },
  { name: 'Usman Malik', role: 'Farm Manager', gender: 'male' },
];

const WHY_US = [
  {
    icon: Leaf,
    title: 'Pure Organic',
    desc: 'All vegetables grown without harmful pesticides or chemicals.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    desc: 'Fresh vegetables delivered to your door within 24 hours.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assured',
    desc: 'Every vegetable is handpicked and quality checked.',
  },
  {
    icon: Award,
    title: 'Farm to Table',
    desc: 'Directly from our trusted local farms to your kitchen.',
  },
];

const FLOATING_VEGS = [
  {
    img: tomatoImg,
    size: 80,
    top: '15%',
    left: '5%',
    delay: '0s',
    duration: '4s',
  },
  {
    img: carrotImg,
    size: 70,
    top: '60%',
    left: '2%',
    delay: '1s',
    duration: '5s',
  },
  {
    img: broccoliImg,
    size: 90,
    top: '20%',
    right: '5%',
    delay: '0.5s',
    duration: '4.5s',
  },
  {
    img: spinachImg,
    size: 65,
    top: '65%',
    right: '3%',
    delay: '1.5s',
    duration: '3.5s',
  },
  {
    img: cucumberImg,
    size: 75,
    top: '40%',
    left: '8%',
    delay: '2s',
    duration: '5s',
  },
  {
    img: tomatoImg,
    size: 55,
    top: '35%',
    right: '8%',
    delay: '0.8s',
    duration: '4s',
  },
];

// Animated stat card
const StatCard = ({ stat, animate }) => {
  const num = useCounter(stat.value, 1800, animate);
  return (
    <div className="bg-white rounded-card shadow-card text-center py-8 px-4 hover:shadow-hover hover:-translate-y-1 transition-all duration-300">
      <h3 className="font-poppins font-black text-[36px] text-green-primary mb-1">
        {animate ? `${num}${stat.suffix}` : stat.value}
      </h3>
      <p className="text-gray-500 text-[13px] font-inter">{stat.label}</p>
    </div>
  );
};

const About = () => {
  const statsRef = useRef(null);
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimateStats(true);
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-bg-light">
      {/* Hero — Animated vegetables */}
      <section
        className="relative py-24 px-6 text-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1e7a2e 0%, #2e9e3e 100%)',
          minHeight: '420px',
        }}
      >
        {/* Floating vegetable images */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-18px) rotate(8deg); }
          }
        `}</style>

        {FLOATING_VEGS.map((veg, i) => (
          <div
            key={i}
            className="absolute pointer-events-none select-none opacity-30"
            style={{
              top: veg.top,
              left: veg.left,
              right: veg.right,
              animation: `float ${veg.duration} ease-in-out infinite`,
              animationDelay: veg.delay,
            }}
          >
            <img
              src={veg.img}
              alt=""
              style={{
                width: veg.size,
                height: veg.size,
                objectFit: 'contain',
              }}
            />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Leaf size={16} />
            About Vegan Fresh
          </span>
          <h1 className="font-poppins font-black text-white text-[40px] md:text-[56px] leading-tight mb-5">
            Fresh From Farm
            <br />
            To Your Table
          </h1>
          <p className="text-white/85 text-[16px] leading-relaxed max-w-xl mx-auto">
            We deliver fresh organic vegetables straight from trusted local
            farms to your door — healthy, natural and affordable.
          </p>
        </div>
      </section>

      {/* Stats — Animated */}
      <section className="py-14 px-6" ref={statsRef}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} animate={animateStats} />
          ))}
        </div>
      </section>

      {/* Mission + Why Organic */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-card shadow-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-pale flex items-center justify-center">
                <Target size={20} className="text-green-primary" />
              </div>
              <h2 className="font-poppins font-bold text-[20px] text-text-dark">
                Our Mission
              </h2>
            </div>
            <p className="text-gray-500 text-[14px] leading-relaxed">
              To provide the freshest organic vegetables to health-conscious
              families and offices across USA and Canada. We believe everyone
              deserves access to clean, chemical-free produce at affordable
              prices.
            </p>
          </div>
          <div className="bg-white rounded-card shadow-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-pale flex items-center justify-center">
                <Leaf size={20} className="text-green-primary" />
              </div>
              <h2 className="font-poppins font-bold text-[20px] text-text-dark">
                Why Organic?
              </h2>
            </div>
            <p className="text-gray-500 text-[14px] leading-relaxed">
              Organic vegetables are grown without harmful pesticides or
              chemicals. They are healthier for you, better for the environment,
              and taste absolutely amazing — a win for you and the planet!
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className="py-12 px-6"
        style={{
          background: 'linear-gradient(180deg, #e8f5e9 0%, #f0faf0 100%)',
        }}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="font-poppins font-bold text-center text-text-dark text-[28px] mb-10">
            Why Choose Vegan Fresh?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {WHY_US.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-card shadow-card p-6 text-center hover:shadow-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-green-pale flex items-center justify-center mx-auto mb-4">
                  <item.icon size={22} className="text-green-primary" />
                </div>
                <h3 className="font-poppins font-bold text-[15px] text-text-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-[13px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team — Professional icons */}
      <section className="py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-poppins font-bold text-center text-text-dark text-[28px] mb-10">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-card shadow-card p-8 text-center hover:shadow-hover hover:-translate-y-1 transition-all duration-300"
              >
                {/* Professional icon avatar */}
                <div className="w-20 h-20 rounded-full bg-green-pale flex items-center justify-center mx-auto mb-4">
                  {member.gender === 'female' ? (
                    <Users size={36} className="text-green-primary" />
                  ) : (
                    <User size={36} className="text-green-primary" />
                  )}
                </div>
                <h3 className="font-poppins font-bold text-[16px] text-text-dark mb-1">
                  {member.name}
                </h3>
                <p className="text-green-primary text-[13px] font-semibold font-inter">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #2e7d32, #81c784)' }}
      >
        <h2 className="font-poppins font-bold text-white text-[28px] mb-3">
          Ready to Eat Fresh?
        </h2>
        <p className="text-white/85 text-[14px] mb-8">
          Order your first box of organic vegetables today!
        </p>
        <a
          href="/products"
          className="inline-block bg-white text-green-primary font-poppins font-bold text-sm px-8 py-3.5 rounded-full hover:shadow-hover hover:scale-105 transition-all duration-200"
        >
          Shop Now 🥦
        </a>
      </section>
    </main>
  );
};

export default About;
