import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Calculator, Moon, Sun, Users, Star, Cog, BookOpen, ArrowRight, Sparkles, Compass, Heart, Brain } from 'lucide-react';

function Sitemap() {
  const siteLinks = {
    coreCalculators: [
      { name: 'Rising Sign Calculator', path: '/rising-sign', icon: Compass },
      { name: 'Moon Sign Calculator', path: '/moon-sign', icon: Moon },
      { name: 'Sun Sign Calculator', path: '/sun-sign', icon: Sun },
    ],
    relationship: [
      { name: 'Kundli Milan Calculator', path: '/kundli-milan', icon: Heart },
      { name: 'Name Compatibility', path: '/name-compatibility', icon: Users },
      { name: 'Upapada Lagna Calculator', path: '/upapada-lagna', icon: Star },
    ],
    nakshatras: [
      { name: 'Nakshatra Calculator', path: '/nakshatra', icon: Star },
      { name: 'Dasha Calculator', path: '/dasha', icon: Calculator },
      { name: 'Atmakaraka Calculator', path: '/atmakaraka', icon: Star },
    ],
    yoga: [
      { name: 'Yoga Calculator', path: '/yoga', icon: Cog },
    ],
    resources: [
      { name: 'About Us', path: '/about-us', icon: Users },
      { name: 'Contact Us', path: '/contact-us', icon: Users },
      { name: 'Privacy Policy', path: '/privacy-policy', icon: BookOpen },
      { name: 'Terms of Service', path: '/terms-of-service', icon: BookOpen },
      { name: 'Cookie Policy', path: '/cookie-policy', icon: BookOpen },
    ],
  };

  const renderLinkSection = (title: string, links: { name: string; path: string; icon: React.ElementType }[]) => (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-sky-900 mb-6">{title}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Icon className="h-5 w-5 text-sky-600" />
              <span className="text-sky-900">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-sky-900 text-center mb-12">Sitemap</h1>

        <div className="max-w-6xl mx-auto">
          {renderLinkSection('Core Calculators', siteLinks.coreCalculators)}
          {renderLinkSection('Relationship', siteLinks.relationship)}
          {renderLinkSection('Nakshatras', siteLinks.nakshatras)}
          {renderLinkSection('Yoga', siteLinks.yoga)}
          {renderLinkSection('Resources', siteLinks.resources)}
        </div>
      </main>
    </div>
  );
}

export default Sitemap;