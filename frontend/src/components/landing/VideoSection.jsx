import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Play, X, Upload, Settings, Sparkles } from 'lucide-react';

export const VideoSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const steps = [
    { 
      step: '01', 
      icon: Upload,
      title: 'Upload Resume', 
      desc: 'Upload your resume and let our AI analyze your skills and experience',
      gradient: 'from-violet-500 to-purple-500'
    },
    { 
      step: '02', 
      icon: Settings,
      title: 'Set Preferences', 
      desc: 'Tell us your ideal role, salary range, location, and work preferences',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      step: '03', 
      icon: Sparkles,
      title: 'Get Matched', 
      desc: 'Receive AI-powered job matches and start applying with one click',
      gradient: 'from-emerald-500 to-teal-500'
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-semibold mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Get Started in{' '}
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Under 2 Minutes
            </span>
          </h2>
          <p className="text-lg text-gray-500">
            Watch how our AI matches you with perfect jobs and automates your applications.
          </p>
        </motion.div>

        {/* Video Thumbnail */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto mb-16"
        >
          <div 
            className="relative aspect-video rounded-3xl overflow-hidden bg-gray-900 cursor-pointer group shadow-2xl shadow-gray-200"
            onClick={() => setIsVideoOpen(true)}
          >
            {/* Thumbnail Image */}
            <img
              src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=675&fit=crop"
              alt="Video thumbnail"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-gray-900/50 transition-colors" />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl cursor-pointer group-hover:shadow-primary/30"
              >
                <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
              </motion.div>
            </div>

            {/* Duration Badge */}
            <div className="absolute bottom-5 right-5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white text-sm font-medium">
              2:15
            </div>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="text-center group"
            >
              {/* Step Number with Icon */}
              <div className="relative inline-flex mb-5">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-900">{item.step}</span>
                </div>
              </div>
              
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Dialog */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-4xl p-0 bg-black border-0 rounded-2xl overflow-hidden">
          <button
            onClick={() => setIsVideoOpen(false)}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="GrowShell Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
