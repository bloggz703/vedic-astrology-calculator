import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, ArrowRight, Sun, Star, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import LocationSearch from '../components/LocationSearch';
import Navigation from '../components/Navigation';
import { calculateSunPosition, getRulingPlanet, getSignCharacteristics } from '../utils/astroCalculations';
import "react-datepicker/dist/react-datepicker.css";

interface Location {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

interface CalculationResult {
  sign: string;
  rulingPlanet: string;
  element: string;
  quality: string;
  characteristics: string[];
}

function SunSignCalculator() {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [birthTime, setBirthTime] = useState<Date | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateSunSign = () => {
    setError(null);

    if (!birthDate || !birthTime || !location) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      // Combine date and time
      const fullDateTime = new Date(
        birthDate.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate(),
        birthTime.getHours(),
        birthTime.getMinutes()
      );

      // Calculate sun sign
      const sunLongitude = calculateSunPosition(fullDateTime);
      const signIndex = Math.floor(sunLongitude / 30);
      const zodiacSigns = [
        'Aries', 'Taurus', 'Gemini', 'Cancer', 
        'Leo', 'Virgo', 'Libra', 'Scorpio',
        'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
      ];
      const sunSign = zodiacSigns[signIndex];
      
      // Get additional information
      const rulingPlanet = getRulingPlanet(sunSign);
      const characteristics = getSignCharacteristics(sunSign);

      setCalculationResult({
        sign: sunSign,
        rulingPlanet,
        ...characteristics
      });
    } catch (err) {
      setError('Error calculating sun sign. Please check your inputs and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-sky-900 mb-8">Sun Sign Calculator</h1>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Birth Details</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Birth Date
              </label>
              <DatePicker
                selected={birthDate}
                onChange={(date) => setBirthDate(date)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholderText="Select birth date"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Birth Time
              </label>
              <DatePicker
                selected={birthTime}
                onChange={(date) => setBirthTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholderText="Select birth time"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Birth Location
              </label>
              <LocationSearch onLocationSelect={setLocation} />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={calculateSunSign}
            className="mt-8 w-full bg-sky-900 text-white px-6 py-3 rounded-lg hover:bg-sky-800 transition-colors flex items-center justify-center gap-2"
          >
            Calculate Sun Sign
            <ArrowRight className="h-4 w-4" />
          </button>

          {calculationResult && (
            <div className="mt-8 p-6 bg-sky-50 rounded-lg">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-sky-900 mb-2">Your Sun Sign is:</h3>
                  <p className="text-3xl font-bold text-sky-700 mb-2">{calculationResult.sign}</p>
                  <p className="text-lg text-sky-600">
                    Ruling Planet: {calculationResult.rulingPlanet}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="p-3 bg-sky-100 rounded-full mb-2">
                      <Star className="h-6 w-6 text-sky-700" />
                    </div>
                    <p className="text-sm font-medium text-sky-900">{calculationResult.element}</p>
                  </div>
                  <div className="text-center">
                    <div className="p-3 bg-sky-100 rounded-full mb-2">
                      <Sun className="h-6 w-6 text-sky-700" />
                    </div>
                    <p className="text-sm font-medium text-sky-900">{calculationResult.quality}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-sky-200 pt-4">
                <h4 className="font-medium text-sky-900 mb-3">Key Characteristics:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {calculationResult.characteristics.map((trait, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg text-center">
                      <p className="text-sky-700">{trait}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-sky-900 mb-6">
            How Does a Sun Sign Calculator Work?
          </h2>
          <div className="prose prose-sky max-w-none">
            <p className="text-gray-600 mb-4">
              A sun sign calculator operates based on precise astrological calculations. Here's a step-by-step breakdown of how it works:
            </p>
            <ol className="list-decimal list-inside space-y-4 text-gray-600">
              <li>
                <span className="font-medium">Input Birth Details:</span> You enter your birth date, exact birth time, and birth location into the calculator.
              </li>
              <li>
                <span className="font-medium">Determine the Sun's Position:</span> The tool calculates the position of the sun at the time of your birth and identifies the corresponding zodiac sign.
              </li>
              <li>
                <span className="font-medium">Generate Results:</span> The calculator displays your sun sign and may also provide additional details, such as the ruling planet and its influence on your personality.
              </li>
            </ol>
            <p className="mt-4 text-gray-600">
              For example, if you were born on July 23rd at 10:00 PM in London, the sun sign calculator might determine that your sun sign is Cancer, indicating that you are nurturing, emotional, and deeply connected to your family and home.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-sky-900 mb-6">
            Discover Your Core Identity with a Sun Sign Calculator
          </h2>
          <div className="prose prose-sky max-w-none text-gray-600">
            <p>
              In astrology, your sun sign is the cornerstone of your astrological identity. It represents your core personality, ego, and life mission, and tells you how you might best express your authentic self. While your moon sign tells you how you feel and your rising sign shows how others see you, your sun sign is your essential self—the person you are learning to become.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-sky-900 mb-6">What is a Sun Sign?</h2>
          <div className="prose prose-sky max-w-none text-gray-600">
            <p>
              Your sun sign is the zodiac sign in which the sun was positioned at the time of your birth. It represents your core consciousness, the qualities you express most prominently. In Western astrology, the sun sign is considered central to your basic personality, which is based on the season of your birth. The sun sign is calculated using the exact position of the sun at your time of birth, making it essential to have accurate birth details for precise calculations.
            </p>
            <p>
              For example, if you were born on July 5th, your Western sun sign would likely be Cancer, while your Vedic sun sign might be Gemini, depending on the exact degree of the sun's position. This distinction highlights the importance of using precise calculations and understanding different astrological systems.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-sky-900 mb-6">The Role of a Sun Sign Calculator</h2>
          <div className="prose prose-sky max-w-none text-gray-600">
            <p>
              A sun sign calculator is an online tool designed to identify the position of determining your sun sign. By inputting your birth details—such as your date, time, and place of birth—the calculator uses astrological algorithms to identify the position of the sun in your birth chart. This tool is especially helpful for those who want to explore different astrological systems.
            </p>
            <p>
              Many sun sign calculators are available for free online, making it easy for anyone to discover their sun sign. Some advanced sign calculators even provide additional insights, such as the placement of your moon sign, rising sign, and other planetary positions in your birth chart.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-sky-900 mb-6">Why is Your Sun Sign Important?</h2>
          <div className="prose prose-sky max-w-none text-gray-600">
            <p>Your sun sign plays a significant role in shaping your personality and life path. Here are some key reasons why understanding your sun sign is essential:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Core Identity:</strong> Your sun sign represents your core self, including your strengths, weaknesses, and life purpose.</li>
              <li><strong>Self-Expression:</strong> It influences how you express yourself and interact with the world.</li>
              <li><strong>Life Goals:</strong> Your sun sign can provide insights into your ambitions, desires, and the direction of your life.</li>
              <li><strong>Compatibility:</strong> Understanding your sun sign can help improve relationships by revealing how you connect with others.</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-sky-900 mb-6">Exploring Different Sun Signs</h2>
          <div className="prose prose-sky max-w-none text-gray-600">
            <p>Each sun sign has its unique characteristics and traits. Here's a brief overview of some different sun signs and their traits:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Aries Sun:</strong> Bold, energetic, and adventurous. Individuals with an Aries sun are natural leaders who thrive on challenges.</li>
              <li><strong>Cancer Sun:</strong> Nurturing, emotional, and protective. A Cancer sun sign indicates a strong connection to family and home.</li>
              <li><strong>Virgo Sun:</strong> Practical, analytical, and detail-oriented. A Virgo sun seeks perfection and order in their life and stability.</li>
              <li><strong>Sagittarius Sun:</strong> Optimistic, adventurous, and freedom-loving. A Sagittarius sun is driven by success and long-term goals.</li>
              <li><strong>Capricorn Sun:</strong> Ambitious, disciplined, and responsible. A Capricorn sun is driven by success and long-term goals.</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-sky-900 mb-6">Using a Sun Sign Calculator for Self-Discovery</h2>
          <div className="prose prose-sky max-w-none text-gray-600">
            <p>A sun sign calculator is more than just a tool for astrologers; it's a powerful resource for anyone interested in self-discovery and personal growth. Here's how you can use it to gain deeper insights into your life:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Understand Your Core Personality:</strong> By knowing your sun sign, you can better understand your strengths, weaknesses, and life purpose.</li>
              <li><strong>Improve Relationships:</strong> Understanding your sun sign can help you navigate relationships more effectively by revealing how you connect with others.</li>
              <li><strong>Set Life Goals:</strong> Your sun sign can guide you in setting and achieving your life goals by highlighting your natural talents and potential.</li>
              <li><strong>Explore Your Birth Chart:</strong> Once you know your sun sign, you can explore its placement in your birth chart and how it interacts with other planetary positions, such as your moon sign and rising sign.</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-sky-900 mb-6">Common Misconceptions About the Sun Sign</h2>
          <div className="prose prose-sky max-w-none text-gray-600">
            <p>Despite its importance, the sun sign is often misunderstood. Here are some common misconceptions and the truth behind them:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>It's the Only Important Sign:</strong> While the sun sign represents your core identity, your moon sign and rising sign are equally important in shaping your personality and life experiences.</li>
              <li><strong>It's Only Relevant for Western Astrology:</strong> The sun sign is significant in both Western astrology and Vedic astrology, though calculated differently.</li>
              <li><strong>You Can Guess Your Sun Sign Without a Calculator:</strong> Because the sun changes signs approximately every 30 days, it's important to use a sun sign calculator to determine your exact sun sign.</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-sky-900 mb-6">Other Useful Astrology Tools</h2>
          <div className="prose prose-sky max-w-none text-gray-600">
            <p>In addition to a sun sign calculator, there are other tools that can enhance your astrological journey:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Moon Sign Calculator:</strong> This tool helps you determine your moon sign, which governs your emotions and inner world.</li>
              <li><strong>Rising Sign Calculator:</strong> This tool identifies your rising sign, which reflects your outward personality and how others see you.</li>
              <li><strong>Birth Chart Calculator:</strong> These tools offer a range of features, from calculating your sun sign and moon sign to generating detailed birth chart reports.</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-sky-900 mb-6">Conclusion</h2>
          <div className="prose prose-sky max-w-none text-gray-600">
            <p>
              Your sun sign is a vital component of your astrological profile, influencing your core identity, self-expression, and life path. A sun sign calculator is an invaluable tool for discovering your sun sign and unlocking its full potential of your birth chart. Whether you're new to astrology or a seasoned enthusiast, understanding your sun sign can provide profound insights into your personality and help you navigate your life journey with greater awareness and purpose.
            </p>
            <p>
              So, take the first step towards self-discovery and use a sun sign calculator to uncover your accurate sun sign. By doing so, you'll gain a deeper understanding of yourself and the unique qualities and traits that make you who you are.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-sky-900 mb-6">Other Useful Astrology Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/moon-sign" className="calculator-link">
              Moon Sign Calculator
            </Link>
            <Link to="/rising-sign" className="calculator-link">
              Rising Sign Calculator
            </Link>
            <Link to="/nakshatra" className="calculator-link">
              Nakshatra Calculator
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SunSignCalculator;