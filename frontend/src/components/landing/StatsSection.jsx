import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Briefcase, TrendingUp, Building2 } from 'lucide-react';

const AnimatedCounter = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    const startValue = 0;
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (end - startValue) * easeOutQuart);
      
      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toLocaleString();
  };

  return (
    <span ref={ref} className="tabular-nums">
      {formatNumber(count)}{suffix}
    </span>
  );
};

export const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: 125000,
      label: 'Active Users',
      suffix: '+',
      gradient: 'from-violet-500 to-purple-600',
      bgColor: 'bg-violet-50'
    },
    {
      icon: Briefcase,
      value: 2500,
      label: 'Jobs Added Daily',
      suffix: '+',
      gradient: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: TrendingUp,
      value: 850000,
      label: 'Total Jobs Indexed',
      suffix: '+',
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Building2,
      value: 5000,
      label: 'Partner Companies',
      suffix: '+',
      gradient: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50'
    }
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative text-center p-6 rounded-2xl bg-gray-50/50 hover:bg-white hover:shadow-lg transition-all duration-300 group"
            >
              {/* Icon */}
              <div className={`inline-flex w-12 h-12 rounded-xl ${stat.bgColor} items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.gradient} bg-clip-text`} style={{ color: 'transparent', backgroundClip: 'text', WebkitBackgroundClip: 'text' }} />
                <stat.icon className={`w-6 h-6 absolute opacity-100`} style={{ 
                  background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                }} />
              </div>
              
              {/* Number */}
              <div className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              
              {/* Label */}
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              
              {/* Live Dot */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wide">Live</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
