import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, MapPin, Star, RotateCcw } from 'lucide-react';
import DatePicker from 'react-datepicker';
import LocationSearch from '../components/LocationSearch';
import Navigation from '../components/Navigation';
import { calculateYogaCombinations } from '../utils/yogaCalculations';
import "react-datepicker/dist/react-datepicker.css";

interface Location {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

interface YogaCombination {
  name: string;
  planets: string[];
  strength: number;
  interpretation: {
    general: string;
    timing: string;
    effects: string[];
  };
}

function YogaCalculator() {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [birthTime, setBirthTime] = useState<Date | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [yogas, setYogas] = useState<YogaCombination[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateYogas = () => {
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

      const combinations = calculateYogaCombinations(fullDateTime, location.latitude, location.longitude);
      setYogas(combinations);
    } catch (err) {
      setError('Error calculating yogas. Please check your inputs and try again.');
    }
  };

  const resetForm = () => {
    setBirthDate(null);
    setBirthTime(null);
    setLocation(null);
    setYogas(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-sky-900 text-center mb-12">Yoga Calculator</h1>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Calculate Your Yogas</h2>
          <p className="text-sky-600 mb-8">Enter your birth details to discover the yogas in your birth chart</p>
          
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

          <div className="mt-8 flex gap-4">
            <button
              onClick={calculateYogas}
              className="flex-1 bg-sky-900 text-white px-6 py-3 rounded-lg hover:bg-sky-800 transition-colors flex items-center justify-center gap-2"
            >
              Calculate Yogas
              <Star className="h-4 w-4" />
            </button>
            {yogas && (
              <button
                onClick={resetForm}
                className="bg-sky-100 text-sky-700 px-6 py-3 rounded-lg hover:bg-sky-200 transition-colors flex items-center justify-center gap-2"
              >
                Reset
                <RotateCcw className="h-4 w-4" />
              </button>
            )}
          </div>

          {yogas && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-sky-900 mb-4">Your Yoga Combinations</h3>
              <div className="space-y-6">
                {yogas.map((yoga, index) => (
                  <div key={index} className="bg-sky-50 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-medium text-sky-900">{yoga.name}</h4>
                        <p className="text-sky-600">
                          Planets: {yoga.planets.join(', ')}
                        </p>
                      </div>
                      <div className="bg-sky-100 px-3 py-1 rounded-full">
                        <p className="text-sky-700 text-sm">
                          Strength: {yoga.strength}/10
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-sky-800">General Effects</h5>
                        <p className="text-sky-600">{yoga.interpretation.general}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-sky-800">Timing</h5>
                        <p className="text-sky-600">{yoga.interpretation.timing}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-sky-800">Specific Effects</h5>
                        <ul className="list-disc list-inside text-sky-600">
                          {yoga.interpretation.effects.map((effect, i) => (
                            <li key={i}>{effect}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-4">How Does a Yoga Calculator Work?</h2>
          <div className="prose prose-sky max-w-none">
            <p className="text-gray-600 mb-4">
              The yoga calculator operates based on the principles of Vedic astrology. Here's a step-by-step breakdown of how it works:
            </p>
            <ol className="list-decimal list-inside space-y-4 text-gray-600">
              <li><strong>Input Birth Details:</strong> The user enters the individual's birth details, including the date, time, and place of birth.</li>
              <li><strong>Analyze Planetary Positions:</strong> The calculator analyzes the positions of all planets in the birth chart.</li>
              <li><strong>Identify Yogas:</strong> The tool identifies the yogas present based on the planetary combinations and alignments.</li>
              <li><strong>Generate Insights:</strong> The calculator provides detailed insights into the yogas, including their nature, significance, and potential impact on the individual's life.</li>
            </ol>
            <p className="text-gray-600 mt-4">
              For example, if your birth chart has Gaja Kesari Yoga, the yoga calculator will highlight this notable yoga and explain how it enhances your intelligence, wisdom, and success. Similarly, if your chart has Bhagya Yoga, the tool will explain how this yoga modifies the effects of Raj Yoga and what it means for your life.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Related Calculators for Deeper Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-sky-900 mb-3">Navamsa Chart Calculator</h3>
              <p className="text-sky-600 mb-4">Analyze the 9th harmonic division chart for deeper insights into marriage and spiritual aspects.</p>
              <a href="/navamsa-chart" className="text-sky-700 hover:text-sky-800 font-medium">
                Calculate Navamsa Chart →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-sky-900 mb-3">Nakshatra Calculator</h3>
              <p className="text-sky-600 mb-4">Discover your birth star and how it influences the yogas in your chart.</p>
              <a href="/nakshatra" className="text-sky-700 hover:text-sky-800 font-medium">
                Calculate Nakshatra →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-sky-900 mb-3">Dasha Calculator</h3>
              <p className="text-sky-600 mb-4">Understand the timing of when specific yogas will manifest in your life.</p>
              <a href="/dasha" className="text-sky-700 hover:text-sky-800 font-medium">
                Calculate Dasha Periods →
              </a>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">What are the most common yogas in Vedic astrology?</summary>
              <p className="mt-4 text-sky-600">
                Common yogas include Raj Yoga (success and authority), Dhana Yoga (wealth), Gaja Kesari Yoga (wisdom and success), and Budh-Aditya Yoga (intelligence and fame). Each yoga has specific planetary requirements and effects.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">How accurate are yoga calculations?</summary>
              <p className="mt-4 text-sky-600">
                The accuracy depends on the precision of birth details provided. Exact birth time and location are crucial for accurate yoga calculations. Our calculator uses precise astronomical algorithms for reliable results.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">Can multiple yogas be remedied?</summary>
              <p className="mt-4 text-sky-600">
                Yes, multiple yogas can be remedied through various astrological remedies. However, some yogas are beneficial and don't need remedies. Consult an experienced astrologer for personalized guidance.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">How do yogas influence career choices?</summary>
              <p className="mt-4 text-sky-600">
                Different yogas indicate success in specific career paths. For example, Budh-Aditya Yoga suggests success in intellectual pursuits, while Dhana Yoga indicates prosperity in business ventures.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">Do yoga effects change over time?</summary>
              <p className="mt-4 text-sky-600">
                While the presence of yogas in your birth chart remains constant, their effects can vary in intensity during different planetary periods (dashas). The timing of yoga manifestation can be predicted using dasha analysis.
              </p>
            </details>
          </div>
        </section>
      </main>
    </div>
  );
}

export default YogaCalculator;