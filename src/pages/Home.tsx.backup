import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Moon, Sun, Users, Star, Cog, BookOpen, ArrowRight, Sparkles, Compass, Heart, Brain } from 'lucide-react';
import Navigation from '../components/Navigation';
import CalculatorCard from '../components/CalculatorCard';
import FeatureCard from '../components/FeatureCard';

function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-sky-900 mb-6 relative inline-block">
            <span className="relative z-10">Vedic Astrology Calculator</span>
            <Sparkles className="absolute -top-6 -right-8 h-8 w-8 text-sky-400 animate-pulse" />
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover ancient wisdom through precise calculations and detailed interpretations
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-sky-900 mb-8">Core Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CalculatorCard
              title="Sun Sign"
              description="Calculate your Vedic Sun Sign based on your birth details."
              type="calculator"
              category="Core"
              extraInfo="Discover your true Vedic Sun Sign and understand how it influences your core personality, ego, and life purpose."
              icon={Sun}
              link="/sun-sign"
            />
            <CalculatorCard
              title="Moon Sign"
              description="Calculate your Moon Sign based on your birth details."
              type="calculator"
              category="Core"
              extraInfo="Understand your emotional nature, instincts, and inner self through your Moon Sign placement."
              icon={Moon}
              link="/moon-sign"
            />
            <CalculatorCard
              title="Rising Sign"
              description="Calculate your Ascendant (Rising Sign) based on birth time and location."
              type="calculator"
              category="Core"
              extraInfo="Learn about your outward personality and how others perceive you through your Rising Sign."
              icon={Compass}
              link="/rising-sign"
            />
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <CalculatorCard
            title="Birth Nakshatra"
            description="Calculate your Janma Nakshatra (birth star) based on your birth details."
            type="calculator"
            category="Popular"
            extraInfo="Discover your birth Nakshatra, pada, deity, and qualities. Learn how these influence your personality, strengths, and life path."
            icon={Star}
            link="/nakshatra"
          />
          <CalculatorCard
            title="Dasha Calculator"
            description="Calculate your Vimshottari Dasha periods based on your birth details."
            type="calculator"
            category="Advanced"
            extraInfo="Understand the planetary periods that influence different stages of your life. Learn about major and sub-periods and their effects."
            icon={Compass}
            link="/dasha"
          />
          <CalculatorCard
            title="Navamsa Chart"
            description="Generate your Navamsa (D9) chart based on birth details."
            type="calculator"
            category="New"
            extraInfo="Explore the ninth harmonic division chart that reveals insights about marriage, spiritual life, and hidden strengths in your horoscope."
            icon={Brain}
            link="/navamsa"
          />
          <CalculatorCard
            title="Name Compatibility"
            description="Calculate marriage compatibility based on names."
            type="calculator"
            category="Popular"
            extraInfo="Discover how well your names align to reveal potential relationship dynamics, strengths, and challenges for a harmonious partnership."
            icon={Heart}
            link="/name-compatibility"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <CalculatorCard
            title="Kundli Milan"
            description="Calculate marriage compatibility based on birth charts."
            type="calculator"
            category="Traditional"
            extraInfo="Analyze compatibility between two birth charts using traditional Vedic astrology principles. Get detailed insights across 8 aspects of relationship harmony."
            icon={Users}
            link="/kundli-milan"
          />
          <CalculatorCard
            title="Atmakaraka"
            description="Identify your soul significator planet in Vedic astrology."
            type="calculator"
            category="Spiritual"
            extraInfo="Calculate your Atmakaraka (soul planet) to gain insights into your spiritual purpose, karmic lessons, and life's deeper meaning according to Jyotish principles."
            icon={Sparkles}
            link="/atmakaraka"
          />
        </div>

        <section className="bg-white rounded-xl shadow-lg p-8 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-semibold text-sky-900 mb-6">About Vedic Astrology</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-4">
                  Vedic astrology, also known as Jyotish, is an ancient Indian system of astrology that dates back thousands of years. It is based on the sidereal zodiac, which accounts for the precession of the equinoxes.
                </p>
                <p className="text-gray-600">
                  Unlike Western astrology, Vedic astrology places greater emphasis on the Moon's position at birth and the 27 Nakshatras or lunar mansions. It offers profound insights into one's life purpose, relationships, career, and spiritual journey.
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-4">
                  The calculations used in our tools are based on traditional Vedic astronomical principles, adapted for modern use with precise astronomical data.
                </p>
                <p className="text-gray-600">
                  While these calculators provide valuable insights, they are meant for educational purposes. For detailed analysis, we recommend consulting with a professional Vedic astrologer who can provide personalized interpretations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-sky-50 rounded-xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba')] opacity-5 bg-cover bg-center"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-semibold text-sky-900 mb-8">Why Use Our Calculators</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                title="Accurate Calculations"
                description="Based on precise astronomical data and traditional Vedic principles."
                icon={Calculator}
              />
              <FeatureCard
                title="Detailed Interpretations"
                description="Get comprehensive information about your results and their meaning."
                icon={BookOpen}
              />
              <FeatureCard
                title="User-Friendly Interface"
                description="Simple to use with clear results, even if you're new to astrology."
                icon={Users}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;