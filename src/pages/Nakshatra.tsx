import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, MapPin, Star } from 'lucide-react';
import DatePicker from 'react-datepicker';
import LocationSearch from '../components/LocationSearch';
import Navigation from '../components/Navigation';
import { calculateNakshatra } from '../utils/nakshatraCalculations';
import "react-datepicker/dist/react-datepicker.css";

interface Location {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

interface CalculationResult {
  nakshatra: string;
  pada: number;
  deity: string;
  ruling_planet: string;
  characteristics: string[];
  interpretation: {
    general: string;
    career: string;
    relationships: string;
    spirituality: string;
  };
}

function NakshatraCalculator() {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [birthTime, setBirthTime] = useState<Date | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateResult = () => {
    setError(null);

    if (!birthDate || !birthTime || !location) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const fullDateTime = new Date(
        birthDate.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate(),
        birthTime.getHours(),
        birthTime.getMinutes()
      );

      const result = calculateNakshatra(fullDateTime, location.latitude, location.longitude);
      setCalculationResult(result);
    } catch (err) {
      setError('Error calculating Nakshatra. Please check your inputs and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-sky-900 text-center mb-12">Nakshatra Calculator</h1>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Birth Details</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Birth Date
              </label>
              <div className="relative">
                <DatePicker
                  selected={birthDate}
                  onChange={(date) => setBirthDate(date)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholderText="Select birth date"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Birth Time
              </label>
              <div className="relative">
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
                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-400 pointer-events-none" />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Birth Location
              </label>
              <div className="relative">
                <LocationSearch onLocationSelect={setLocation} />
                <MapPin className="absolute right-3 top-3 h-5 w-5 text-sky-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={calculateResult}
            className="mt-8 w-full bg-sky-900 text-white px-6 py-3 rounded-lg hover:bg-sky-800 transition-colors flex items-center justify-center gap-2"
          >
            Calculate Nakshatra
            <Star className="h-4 w-4" />
          </button>

          {calculationResult && (
            <div className="mt-8 p-6 bg-sky-50 rounded-lg">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-sky-900 mb-2">Your Birth Nakshatra</h3>
                <p className="text-3xl font-bold text-sky-700 mb-2">
                  {calculationResult.nakshatra} (Pada {calculationResult.pada})
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-sky-600">Ruling Deity</p>
                    <p className="text-lg font-medium text-sky-900">{calculationResult.deity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-sky-600">Ruling Planet</p>
                    <p className="text-lg font-medium text-sky-900">{calculationResult.ruling_planet}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-sky-900 mb-3">Key Characteristics:</h4>
                <div className="grid grid-cols-2 gap-4">
                  {calculationResult.characteristics.map((trait, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg text-center">
                      <p className="text-sky-700">{trait}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-sky-200 pt-4">
                <h4 className="font-medium text-sky-900 mb-3">Interpretation:</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sky-800 font-medium">General</h5>
                    <p className="text-sky-600">{calculationResult.interpretation.general}</p>
                  </div>
                  <div>
                    <h5 className="text-sky-800 font-medium">Career</h5>
                    <p className="text-sky-600">{calculationResult.interpretation.career}</p>
                  </div>
                  <div>
                    <h5 className="text-sky-800 font-medium">Relationships</h5>
                    <p className="text-sky-600">{calculationResult.interpretation.relationships}</p>
                  </div>
                  <div>
                    <h5 className="text-sky-800 font-medium">Spirituality</h5>
                    <p className="text-sky-600">{calculationResult.interpretation.spirituality}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-4">How to Use the Nakshatra Calculator</h2>
          <div className="prose prose-sky max-w-none">
            <p className="text-gray-600 mb-4">
              Our Nakshatra Calculator provides insights into your Janma Nakshatra (birth star) based on Vedic astrology principles. Follow these simple steps:
            </p>
            <ol className="list-decimal list-inside space-y-4 text-gray-600">
              <li>Enter your personal details (name, birth date, birth time)</li>
              <li>Provide accurate birth location information</li>
              <li>Review your detailed Nakshatra analysis</li>
              <li>Explore how your Nakshatra influences your personality and life path</li>
            </ol>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Nakshatra Interpretation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-sky-900 mb-3">Nakshatra Name</h3>
              <p className="text-sm text-sky-600 mb-2">Birth Star</p>
              <p className="text-sky-600">
                The specific lunar mansion the Moon was positioned in at your birth time
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-sky-900 mb-3">Pada (Quarter)</h3>
              <p className="text-sm text-sky-600 mb-2">1-4</p>
              <p className="text-sky-600">
                Each Nakshatra is divided into four quarters, providing more nuanced interpretation
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-sky-900 mb-3">Ruling Deity</h3>
              <p className="text-sm text-sky-600 mb-2">Divine Influence</p>
              <p className="text-sky-600">
                The cosmic deity that governs your Nakshatra and bestows specific qualities
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-sky-900 mb-3">Lordship</h3>
              <p className="text-sm text-sky-600 mb-2">Planetary Ruler</p>
              <p className="text-sky-600">
                The planet that rules your Nakshatra, influencing your personality traits
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-sky-900 mb-3">Key Qualities</h3>
              <p className="text-sm text-sky-600 mb-2">Core Traits</p>
              <p className="text-sky-600">
                The primary characteristics and tendencies associated with your Nakshatra
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-sky-900 mb-3">Compatible Nakshatras</h3>
              <p className="text-sm text-sky-600 mb-2">Relationships</p>
              <p className="text-sky-600">
                Nakshatras that generally harmonize well with yours for relationships and partnerships
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">What is a Nakshatra?</summary>
              <p className="mt-4 text-sky-600">
                A Nakshatra is a lunar mansion in Vedic astrology. There are 27 Nakshatras, each divided into four padas (quarters), creating a total of 108 unique combinations.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">How accurate is the Nakshatra Calculator?</summary>
              <p className="mt-4 text-sky-600">
                Our calculator uses precise astronomical calculations based on your birth details. The accuracy depends on the precision of your birth time and location information.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">What is Janma Nakshatra?</summary>
              <p className="mt-4 text-sky-600">
                Janma Nakshatra is your birth star - the lunar mansion where the Moon was positioned at the time of your birth. It reveals key aspects of your personality and life path.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">How do Nakshatras affect relationships?</summary>
              <p className="mt-4 text-sky-600">
                Nakshatras play a crucial role in determining compatibility between individuals. The relationship between two people's birth Nakshatras can indicate potential harmony or challenges.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">What are Nakshatra Padas?</summary>
              <p className="mt-4 text-sky-600">
                Each Nakshatra is divided into four padas or quarters. Each pada has unique characteristics and influences different aspects of life, providing more detailed insights into your cosmic blueprint.
              </p>
            </details>
          </div>
        </section>
      </main>
    </div>
  );
}

export default NakshatraCalculator;