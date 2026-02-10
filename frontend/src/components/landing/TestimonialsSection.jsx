import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialsColumn } from '../ui/testimonials-columns';

const testimonials = [
  {
    text: "GrowShell's AI matching is incredible. I got 3 interview calls within a week of signing up. The resume tailoring feature alone is worth it!",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Sarah Chen",
    role: "Software Engineer at Google",
  },
  {
    text: "The auto-apply feature saved me countless hours. I went from applying to 5 jobs a week to 50+. Landed my dream role at Microsoft!",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Michael Rodriguez",
    role: "Product Manager at Microsoft",
  },
  {
    text: "Best investment in my career. The AI mock interviews prepared me perfectly. Went from nervous to confident in just 2 weeks.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Emily Watson",
    role: "Data Scientist at Meta",
  },
  {
    text: "The job matching algorithm is spot on. Every recommendation felt tailored to my exact skills and career goals.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "David Park",
    role: "Senior Developer at Amazon",
  },
  {
    text: "From resume optimization to interview prep, GrowShell has everything. Landed 5 offers in just one month!",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Jessica Liu",
    role: "UX Designer at Apple",
  },
  {
    text: "The AI-powered cover letter generator saved me hours. Each letter felt personalized and professional.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Amanda Foster",
    role: "Marketing Lead at Netflix",
  },
  {
    text: "Switched careers from finance to tech with GrowShell's help. The skills gap analysis was incredibly helpful.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "James Wilson",
    role: "Backend Engineer at Stripe",
  },
  {
    text: "The salary insights feature helped me negotiate a 30% higher offer. Absolutely game-changing!",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Nina Patel",
    role: "Product Lead at Airbnb",
  },
  {
    text: "As a recent grad, GrowShell helped me land my first tech job. The entry-level job filters are perfect.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Alex Thompson",
    role: "Junior Developer at Spotify",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// Premium company logos
const companyLogos = [
  { name: 'Google', logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png' },
  { name: 'Microsoft', logo: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31' },
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png' },
  { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/200px-Meta_Platforms_Inc._logo.svg.png' },
  { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/80px-Apple_logo_black.svg.png' },
  { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/200px-Netflix_2015_logo.svg.png' },
  { name: 'Spotify', logo: 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png' },
  { name: 'Airbnb', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/200px-Airbnb_Logo_B%C3%A9lo.svg.png' },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-primary/20 py-1.5 px-4 rounded-full bg-primary/5 text-primary text-sm font-semibold">
              Testimonials
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-5 text-center text-foreground">
            What our users say
          </h2>
          <p className="text-center mt-5 text-foreground/60 text-lg">
            Join thousands of professionals who found their dream jobs with GrowShell
          </p>
        </motion.div>

        {/* Scrolling Testimonials Columns */}
        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-16 mt-10 border-t border-border"
        >
          <p className="text-center text-sm text-foreground/40 mb-8 font-medium">
            Our users work at world's leading companies
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 lg:gap-x-14">
            {companyLogos.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-6 lg:h-7 w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
