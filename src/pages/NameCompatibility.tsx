import React, { useState } from 'react';
import { ArrowLeft, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { calculateNameCompatibility } from '../utils/nameCalculations';

interface CompatibilityResult {
  score: number;
  interpretation: {
    level: string;
    description: string;
    recommendation: string;
  };
  aspects: {
    name: string;
    score: number;
    description: string;
  }[];
}

function NameCompatibilityCalculator() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateCompatibility = () => {
    setError(null);

    if (!name1.trim() || !name2.trim()) {
      setError('Please enter both names');
      return;
    }

    const compatibility = calculateNameCompatibility(name1, name2);
    setResult(compatibility);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-sky-900 text-center mb-12">Name Compatibility Calculator</h1>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Person's Name
              </label>
              <input
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                placeholder="Enter first name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Second Person's Name
              </label>
              <input
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                placeholder="Enter second name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={calculateCompatibility}
            className="w-full bg-sky-900 text-white px-6 py-3 rounded-lg hover:bg-sky-800 transition-colors flex items-center justify-center gap-2"
          >
            Calculate Compatibility
            <Heart className="h-4 w-4" />
          </button>

          {result && (
            <div className="mt-8 p-6 bg-sky-50 rounded-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-sky-900 mb-2">Compatibility Score</h3>
                  <p className="text-3xl font-bold text-sky-700">{result.score}%</p>
                  <p className="text-lg text-sky-600">{result.interpretation.level} Match</p>
                </div>
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < Math.round((result.score / 100) * 5)
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-sky-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-sky-900 mb-3">Compatibility Aspects:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.aspects.map((aspect, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg">
                      <p className="text-sky-600 font-medium">{aspect.name}</p>
                      <div className="mt-2 h-2 bg-sky-100 rounded">
                        <div
                          className="h-2 bg-sky-500 rounded"
                          style={{ width: `${aspect.score}%` }}
                        ></div>
                      </div>
                      <p className="mt-2 text-sm text-sky-600">{aspect.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-sky-200 pt-4">
                <h4 className="font-medium text-sky-900 mb-3">Interpretation:</h4>
                <p className="text-sky-600 mb-2">{result.interpretation.description}</p>
                <p className="text-sky-700 font-medium">{result.interpretation.recommendation}</p>
              </div>
            </div>
          )}
        </div>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-4">How Name Compatibility Works</h2>
          <p className="text-sky-600 mb-6">
            Name compatibility is based on the principle that names carry vibrations and energies that influence a person's personality traits and life path. By analyzing the names of potential partners, this calculator reveals how well two individuals might align in terms of communication, values, and relationship dynamics.
          </p>
          <p className="text-sky-600">
            Our calculator uses advanced numerology principles to convert names into numerical values. These values are then compared to determine compatibility percentages, along with specific strengths and potential challenges in the relationship.
          </p>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">Is name compatibility accurate for predicting marriage success?</summary>
              <p className="mt-4 text-sky-600">
                While name compatibility can provide insights into potential dynamics between partners, it should be considered alongside other factors such as shared values, goals, and mutual understanding.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">Should I use my full name or nickname for the calculation?</summary>
              <p className="mt-4 text-sky-600">
                It's recommended to use your full birth name for the most accurate results, as this name carries your core energy signature.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">How does name compatibility compare to horoscope matching?</summary>
              <p className="mt-4 text-sky-600">
                Name compatibility and horoscope matching offer different perspectives on relationship dynamics. While horoscope matching looks at planetary positions, name compatibility focuses on the energetic vibrations of names.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">Can a low compatibility score be improved?</summary>
              <p className="mt-4 text-sky-600">
                A low compatibility score indicates areas that may need more attention and understanding in the relationship. With awareness and effort, couples can work on these aspects to improve their relationship.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">Does name compatibility work for same-sex relationships?</summary>
              <p className="mt-4 text-sky-600">
                Yes, name compatibility works for all types of relationships as it focuses on the energetic qualities of names rather than gender.
              </p>
            </details>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Compatibility by Name for Marriage: Finding Your Perfect Match</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <p className="mb-4">
              In the journey of life, finding the right life partner is one of the most significant decisions we make. Whether it's for marriage, a love relationship, or even a business partnership, compatibility plays a crucial role in ensuring a harmonious relationship. While traditional methods like horoscope matching and zodiac analysis have long been used to assess compatibility, a modern and increasingly popular approach is compatibility by name for marriage. This method uses the power of names to determine how well two individuals align in terms of personality traits, love life, and long-term relationship potential.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">What is Compatibility by Name for Marriage?</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <p className="mb-4">
              Compatibility by name for marriage is a method that analyzes the names of two individuals to determine their potential for a successful and lasting relationship. It is based on the idea that names carry vibrations and energies that influence a person's personality, traits, and life path. By comparing the names of a couple, this method can reveal whether they are a compatible match or if there are potential challenges in their relationship.
            </p>
            <p className="mb-4">
              This approach is often used alongside other methods like horoscope matching and zodiac analysis to provide a more comprehensive understanding of compatibility. It is particularly useful for those who believe in the power of names and their impact on life and love.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Explore Other Relationship Calculators</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/kundli-milan" className="calculator-link">
              <div className="flex items-center gap-3 justify-center">
                <Heart className="h-5 w-5 text-sky-700" />
                <span>Kundli Milan Calculator</span>
              </div>
              <p className="text-sm text-sky-600 mt-2">
                Traditional Vedic compatibility analysis measuring 8 key aspects of marital harmony
              </p>
            </Link>
            <Link to="/upapada-lagna" className="calculator-link">
              <div className="flex items-center gap-3 justify-center">
                <Star className="h-5 w-5 text-sky-700" />
                <span>Upapada Lagna Calculator</span>
              </div>
              <p className="text-sm text-sky-600 mt-2">
                Discover relationship patterns and special characteristics from your birth chart
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default NameCompatibilityCalculator;