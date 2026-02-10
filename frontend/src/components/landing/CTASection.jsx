import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Check } from 'lucide-react';

export const CTASection = () => {
  const navigate = useNavigate();

  const benefits = [
    "AI-powered job matching",
    "Unlimited resume tailoring",
    "Auto-apply to 50+ jobs/week",
    "AI mock interviews",
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-primary via-purple-600 to-indigo-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">
              Start Your Journey Today
            </span>
          </motion.div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Ready to Find Your{' '}
            <span className="bg-gradient-to-r from-yellow-200 to-amber-200 bg-clip-text text-transparent">
              Dream Job?
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Join 125,000+ professionals who are already using GrowShell to accelerate their careers.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="flex items-center gap-2 text-sm text-white/80"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                {benefit}
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => navigate('/signup')}
              size="lg"
              className="h-14 px-10 bg-white text-primary hover:bg-white/90 shadow-2xl shadow-black/20 rounded-xl font-bold text-base"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={() => navigate('/demo')}
              size="lg"
              variant="ghost"
              className="h-14 px-10 text-white border-2 border-white/30 hover:bg-white/10 rounded-xl font-semibold"
            >
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicator */}
          <p className="text-sm text-white/50 pt-2">
            No credit card required • Free forever plan • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};
