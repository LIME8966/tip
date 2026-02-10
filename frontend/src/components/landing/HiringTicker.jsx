import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, ExternalLink, DollarSign } from 'lucide-react';

// Premium company ticker data with real logos
const tickerData = [
  { 
    company: 'Google', 
    role: 'Senior Software Engineer', 
    time: '2h ago',
    logo: 'https://www.google.com/favicon.ico',
    salary: '$180K - $250K',
    location: 'Mountain View, CA'
  },
  { 
    company: 'Microsoft', 
    role: 'Product Manager', 
    time: '3h ago',
    logo: 'https://www.microsoft.com/favicon.ico',
    salary: '$150K - $200K',
    location: 'Seattle, WA'
  },
  { 
    company: 'Amazon', 
    role: 'Data Scientist', 
    time: '4h ago',
    logo: 'https://www.amazon.com/favicon.ico',
    salary: '$140K - $190K',
    location: 'Remote'
  },
  { 
    company: 'Meta', 
    role: 'Frontend Developer', 
    time: '5h ago',
    logo: 'https://static.xx.fbcdn.net/rsrc.php/yo/r/iRmz9lCMBD2.ico',
    salary: '$160K - $220K',
    location: 'Menlo Park, CA'
  },
  { 
    company: 'Apple', 
    role: 'iOS Engineer', 
    time: '6h ago',
    logo: 'https://www.apple.com/favicon.ico',
    salary: '$170K - $240K',
    location: 'Cupertino, CA'
  },
  { 
    company: 'Netflix', 
    role: 'Backend Engineer', 
    time: '7h ago',
    logo: 'https://assets.nflxext.com/ffe/siteui/common/icons/nficon2016.ico',
    salary: '$200K - $300K',
    location: 'Los Gatos, CA'
  },
  { 
    company: 'Stripe', 
    role: 'Full Stack Developer', 
    time: '8h ago',
    logo: 'https://stripe.com/favicon.ico',
    salary: '$150K - $210K',
    location: 'San Francisco, CA'
  },
  { 
    company: 'Airbnb', 
    role: 'UX Designer', 
    time: '9h ago',
    logo: 'https://www.airbnb.com/favicon.ico',
    salary: '$130K - $180K',
    location: 'Remote'
  },
  { 
    company: 'Spotify', 
    role: 'ML Engineer', 
    time: '10h ago',
    logo: 'https://www.spotify.com/favicon.ico',
    salary: '$155K - $200K',
    location: 'New York, NY'
  },
  { 
    company: 'Uber', 
    role: 'Platform Engineer', 
    time: '11h ago',
    logo: 'https://www.uber.com/favicon.ico',
    salary: '$145K - $195K',
    location: 'San Francisco, CA'
  },
];

export const HiringTicker = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const tickerItems = [...tickerData, ...tickerData];

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setIsDialogOpen(true);
  };

  return (
    <section className="py-6 bg-gray-50/50 border-y border-gray-100 overflow-hidden">
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-gray-50/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-gray-50/50 to-transparent z-10 pointer-events-none" />
        
        {/* Ticker */}
        <div className="flex animate-ticker hover:[animation-play-state:paused]">
          {tickerItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleJobClick(item)}
              className="flex items-center gap-3 px-5 py-3 mx-2 rounded-xl bg-white border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-200 shrink-0 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden">
                <img 
                  src={item.logo} 
                  alt={item.company}
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<span class="text-sm font-bold text-gray-400">${item.company[0]}</span>`;
                  }}
                />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 group-hover:text-primary transition-colors text-sm">
                  {item.company}
                </p>
                <p className="text-xs text-gray-500">{item.role}</p>
              </div>
              <Badge variant="secondary" className="ml-2 text-[10px] bg-gray-100 text-gray-500">
                {item.time}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Job Preview Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg">Job Preview</DialogTitle>
          </DialogHeader>
          
          {selectedJob && (
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
                  <img 
                    src={selectedJob.logo} 
                    alt={selectedJob.company}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {selectedJob.role}
                  </h3>
                  <p className="text-gray-500">{selectedJob.company}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  Posted {selectedJob.time}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  <MapPin className="w-3 h-3 mr-1" />
                  {selectedJob.location}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  <DollarSign className="w-3 h-3 mr-1" />
                  {selectedJob.salary}
                </Badge>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed">
                This is a preview of the job posting. Sign up or log in to see full details, company insights, and apply with one click.
              </p>

              <div className="flex gap-3 pt-2">
                <Button 
                  className="flex-1"
                  onClick={() => setIsDialogOpen(false)}
                >
                  View Full Details
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
