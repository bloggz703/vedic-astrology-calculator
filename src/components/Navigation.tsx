import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Moon, Sun, Users, Star, Cog, BookOpen, ChevronDown, Compass, Heart, Menu, X } from 'lucide-react';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-sky-900 text-white py-4 relative z-50">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba')] opacity-10 bg-cover bg-center"></div>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center relative">
          <Link to="/" className="text-2xl font-semibold flex items-center gap-3 group">
            <div className="relative">
              <Moon className="h-8 w-8 transition-transform group-hover:scale-110" />
              <Star className="h-4 w-4 absolute -top-1 -right-1 text-sky-200 transition-transform group-hover:rotate-45" />
            </div>
            <span className="bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">
              Vedic Calculators
            </span>
          </Link>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-8">
            {/* Core Calculators Dropdown */}
            <div className="relative group">
              <button className="nav-link flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Core Calculators
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="nav-dropdown">
                <Link to="/rising-sign" className="nav-dropdown-item">
                  <Compass className="h-4 w-4" />
                  Rising Sign Calculator
                </Link>
                <Link to="/moon-sign" className="nav-dropdown-item">
                  <Moon className="h-4 w-4" />
                  Moon Sign Calculator
                </Link>
                <Link to="/sun-sign" className="nav-dropdown-item">
                  <Sun className="h-4 w-4" />
                  Sun Sign Calculator
                </Link>
              </div>
            </div>

            {/* Relationship Dropdown */}
            <div className="relative group">
              <button className="nav-link flex items-center gap-2">
                <Users className="h-5 w-5" />
                Relationship
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="nav-dropdown">
                <Link to="/kundli-milan" className="nav-dropdown-item">
                  <Heart className="h-4 w-4" />
                  Kundli Milan Calculator
                </Link>
                <Link to="/name-compatibility" className="nav-dropdown-item">
                  <Users className="h-4 w-4" />
                  Name Compatibility
                </Link>
                <Link to="/upapada-lagna" className="nav-dropdown-item">
                  <Star className="h-4 w-4" />
                  Upapada Lagna Calculator
                </Link>
              </div>
            </div>

            {/* Nakshatras */}
            <div className="relative group">
              <button className="nav-link flex items-center gap-2">
                <Star className="h-5 w-5" />
                Nakshatras
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="nav-dropdown">
                <Link to="/nakshatra" className="nav-dropdown-item">
                  <Star className="h-4 w-4" />
                  Nakshatra Calculator
                </Link>
                <Link to="/dasha" className="nav-dropdown-item">
                  <Calculator className="h-4 w-4" />
                  Dasha Calculator
                </Link>
                <Link to="/atmakaraka" className="nav-dropdown-item">
                  <Star className="h-4 w-4" />
                  Atmakaraka Calculator
                </Link>
              </div>
            </div>

            {/* Yoga */}
            <div className="relative group">
              <button className="nav-link flex items-center gap-2">
                <Cog className="h-5 w-5" />
                Yoga
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="nav-dropdown">
                <Link to="/yoga" className="nav-dropdown-item">
                  <Calculator className="h-4 w-4" />
                  Yoga Calculator
                </Link>
              </div>
            </div>

            {/* Resources */}
            <div className="relative group">
              <button className="nav-link flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Resources
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="nav-dropdown">
                <Link to="/about-us" className="nav-dropdown-item">
                  <BookOpen className="h-4 w-4" />
                  About Us
                </Link>
                <Link to="/contact-us" className="nav-dropdown-item">
                  <Users className="h-4 w-4" />
                  Contact Us
                </Link>
                <Link to="/privacy-policy" className="nav-dropdown-item">
                  <BookOpen className="h-4 w-4" />
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="nav-dropdown-item">
                  <BookOpen className="h-4 w-4" />
                  Terms of Service
                </Link>
                <Link to="/cookie-policy" className="nav-dropdown-item">
                  <BookOpen className="h-4 w-4" />
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden fixed inset-0 bg-sky-900 bg-opacity-95 z-50 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="container mx-auto px-4 py-8 space-y-6">
              <div className="flex justify-between items-center mb-8">
                <Link to="/" className="text-2xl font-semibold text-white" onClick={() => setIsMenuOpen(false)}>
                  Vedic Calculators
                </Link>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Core Calculators
                  </h3>
                  <div className="space-y-2 pl-7">
                    <Link to="/rising-sign" className="block text-sky-200 hover:text-white" onClick={() => setIsMenuOpen(false)}>Rising Sign Calculator</Link>
                    <Link to="/moon-sign" className="block text-sky-200 hover:text-white" onClick={() => setIsMenuOpen(false)}>Moon Sign Calculator</Link>
                    <Link to="/sun-sign" className="block text-sky-200 hover:text-white" onClick={() => setIsMenuOpen(false)}>Sun Sign Calculator</Link>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Relationship
                  </h3>
                  <div className="space-y-2 pl-7">
                    <Link to="/kundli-milan" className="block text-sky-200 hover:text-white" onClick={() => setIsMenuOpen(false)}>Kundli Milan Calculator</Link>
                    <Link to="/name-compatibility" className="block text-sky-200 hover:text-white" onClick={() => setIsMenuOpen(false)}>Name Compatibility</Link>
                    <Link to="/upapada-lagna" className="block text-sky-200 hover:text-white" onClick={() => setIsMenuOpen(false)}>Upapada Lagna Calculator</Link>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Nakshatras
                  </h3>
                  <div className="space-y-2 pl-7">
                    <Link to="/nakshatra" className="block text-sky-200 hover:text-white" onClick={() => setIsMenuOpen(false)}>Nakshatra Calculator</Link>
                    <Link to="/dasha" className="block text-sky-200 hover:text-white" onClick={() => setIsMenuOpen(false)}>Dasha Calculator</Link>
                    <Link to="/atmakaraka" className="block text-sky-200 hover:text-white" onClick={() => setIsMenuOpen(false)}>Atmakaraka Calculator</Link>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Cog className="h-5 w-5" />
                    Yoga
                  </h3>
                  <div className="space-y-2 pl-7">
                    <Link to="/yoga" className="block text-sky-200 hover:text-white" onClick={() => setIsMenuOpen(false)}>Yoga Calculator</Link>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Resources
                  </h3>
                  <div className="space-y-2 pl-7">
                    <Link to="/about-us" className="block text-sky-200 hover:text-white" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                    <Link to="/contact-us" className="block text-sky-200 hover:text-white" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                    <Link to="/privacy-policy" className="block text-sky-200 hover:text-white" onClick={() => setIsMenuOpen(false)}>Privacy Policy</Link>
                    <Link to="/terms-of-service" className="block text-sky-200 hover:text-white" onClick={() => setIsMenuOpen(false)}>Terms of Service</Link>
                    <Link to="/cookie-policy" className="block text-sky-200 hover:text-white" onClick={() => setIsMenuOpen(false)}>Cookie Policy</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;