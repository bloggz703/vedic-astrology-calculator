import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, MapPin, Star } from 'lucide-react';
import DatePicker from 'react-datepicker';
import LocationSearch from '../components/LocationSearch';
import Navigation from '../components/Navigation';
import { calculateAtmakaraka } from '../utils/atmakarakaCalculations';
import "react-datepicker/dist/react-datepicker.css";

interface Location {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

interface CalculationResult {
  planet: string;
  degree: number;
  interpretation: {
    general: string;
    karmic_lessons: string;
    spiritual_path: string;
    life_purpose: string;
  };
  characteristics: string[];
}

function AtmakarakaCalculator() {
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

      const result = calculateAtmakaraka(fullDateTime, location.latitude, location.longitude);
      setCalculationResult(result);
    } catch (err) {
      setError('Error calculating Atmakaraka. Please check your inputs and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-sky-900 text-center mb-12">Atmakaraka Calculator</h1>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Calculate Your Atmakaraka</h2>
          <p className="text-sky-600 mb-8">Enter your birth details to discover your soul's significator planet.</p>
          
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
            Calculate Atmakaraka
            <Star className="h-4 w-4" />
          </button>

          {calculationResult && (
            <div className="mt-8 p-6 bg-sky-50 rounded-lg">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-sky-900 mb-2">Your Atmakaraka</h3>
                <p className="text-3xl font-bold text-sky-700 mb-2">
                  {calculationResult.planet} ({calculationResult.degree.toFixed(2)}°)
                </p>
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
                    <h5 className="text-sky-800 font-medium">Karmic Lessons</h5>
                    <p className="text-sky-600">{calculationResult.interpretation.karmic_lessons}</p>
                  </div>
                  <div>
                    <h5 className="text-sky-800 font-medium">Spiritual Path</h5>
                    <p className="text-sky-600">{calculationResult.interpretation.spiritual_path}</p>
                  </div>
                  <div>
                    <h5 className="text-sky-800 font-medium">Life Purpose</h5>
                    <p className="text-sky-600">{calculationResult.interpretation.life_purpose}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-4">How Does the Atmakaraka Calculator Work?</h2>
          <div className="prose prose-sky max-w-none">
            <p className="text-gray-600 mb-4">
              The Atmakaraka calculator operates based on the principles of Vedic astrology. Here's a step-by-step breakdown of how it works:
            </p>
            <ol className="list-decimal list-inside space-y-4 text-gray-600">
              <li>Input Birth Details: The user enters the individual's birth details, including the date, time, and place of birth.</li>
              <li>Analyze Planetary Degrees: The calculator analyzes the degrees of all planets in the birth chart.</li>
              <li>Identify the Atmakaraka: The planet with the highest degree is identified as the Atmakaraka planet.</li>
              <li>Generate Insights: The calculator provides insights into the Atmakaraka influences, including its role in the individual's spiritual journey and karmic lessons.</li>
            </ol>
            <p className="text-gray-600 mt-4">
              For example, if the Atmakaraka calculator reveals that your Atmakaraka planet is Venus, it means that Venus plays a crucial role in your soul's purpose and life experiences. Venus, as the Atmakaraka, may influence your relationships, creativity, and pursuit of harmony.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">How accurate is the Atmakaraka calculator?</summary>
              <p className="mt-4 text-sky-600">
                The Atmakaraka calculator uses precise astronomical calculations based on your birth details. The accuracy depends on the precision of your birth time and location information.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">Can my Atmakaraka change over time?</summary>
              <p className="mt-4 text-sky-600">
                No, your Atmakaraka is determined at birth and remains constant throughout your life. It represents your soul's journey and core purpose.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">How does the Atmakaraka differ from my Sun or Moon sign?</summary>
              <p className="mt-4 text-sky-600">
                While your Sun sign represents your basic personality and Moon sign reflects your emotional nature, the Atmakaraka represents your soul's purpose and highest spiritual potential.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">How can I use my Atmakaraka information for spiritual growth?</summary>
              <p className="mt-4 text-sky-600">
                Understanding your Atmakaraka can help guide your spiritual practices, reveal karmic lessons, and illuminate your soul's purpose. Work with the qualities of your Atmakaraka planet in meditation and self-reflection.
              </p>
            </details>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Understanding the Atmakaraka Calculator: A Guide to Your Soul's Journey</h2>
          <div className="prose prose-sky max-w-none text-gray-600">
            <p className="mb-4">
              In Vedic astrology, the concept of Atmakaraka holds profound significance. The term Atmakaraka is derived from two Sanskrit words: Atman, meaning "soul," and Karaka, meaning "significator." Thus, Atmakaraka is often referred to as the "significator of the soul" and represents the planet that has the highest degree in a person's birth chart. This celestial body plays a crucial role in understanding one's spiritual journey in this lifetime. To simplify the process of identifying and interpreting the Atmakaraka, an Atmakaraka calculator has become an essential tool for astrologers and spiritual seekers alike. In this article, we will explore the importance of Atmakaraka, how an Atmakaraka calculator works, and how it can help you understand your soul's path.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">What is Atmakaraka?</h2>
          <div className="prose prose-sky max-w-none text-gray-600">
            <p className="mb-4">
              The Atmakaraka is one of the most critical elements in Vedic astrology, particularly in the study of the Karakamsha chart. It's the planet that holds the highest degree in a person's birth chart, making it the most influential planet in terms of the soul's journey. The Atmakaraka planet signifies the core essence of an individual's life purpose, karmic growth, and future lessons.
            </p>
            <p className="mb-4">
              For example, if Mars has the highest degree in your birth chart, Mars becomes your Atmakaraka planet. This means that Mars will play a significant role in shaping your spiritual path and life experiences. Understanding your Atmakaraka status can provide deep insights into your soul's desires, challenges, and ultimate purpose.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">The Role of the Atmakaraka Calculator</h2>
          <div className="prose prose-sky max-w-none text-gray-600">
            <p className="mb-4">
              Identifying the Atmakaraka manually requires a thorough analysis of the birth chart, which can be time-consuming and complex. This is where an Atmakaraka calculator comes into play. An Atmakaraka calculator is an online tool that automates the process of determining the Atmakaraka planet based on the individual's birth details. Once you input the date, time, and place of birth, the calculator quickly identifies the Atmakaraka and provides insights into its influences.
            </p>
            <p className="mb-4">
              A free Atmakaraka calculator is available online, making it accessible to anyone interested in exploring their soul's journey. For more detailed and accurate Atmakaraka calculations, advanced tools and software are also available.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Significance of the Atmakaraka Planet</h2>
          <div className="prose prose-sky max-w-none text-gray-600">
            <p className="mb-4">
              The Atmakaraka planet is not just another planet in your birth chart; it holds the key to understanding your soul's journey. Here are some key reasons why the Atmakaraka is significant:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Soul's Purpose:</strong> The Atmakaraka planet signifies the core purpose of your soul in this lifetime. It reflects your deepest desires and spiritual goals.</li>
              <li><strong>Karmic Lessons:</strong> The Atmakaraka is closely linked to your karmic lessons. It highlights the challenges and experiences you need to undergo for spiritual growth.</li>
              <li><strong>Spiritual Growth:</strong> Understanding your Atmakaraka can provide valuable insights into your spiritual path and how to align with your higher self.</li>
              <li><strong>Life Experiences:</strong> The Atmakaraka influences various aspects of your life, including relationships, career, and personal growth.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">The Karakamsha Chart and Atmakaraka</h2>
          <div className="prose prose-sky max-w-none text-gray-600">
            <p className="mb-4">
              The Karakamsha chart is a divisional chart in Vedic astrology that is closely associated with the Atmakaraka. This chart provides deeper insights into the soul's journey and spiritual path. The Atmakaraka planet plays a pivotal role in the Karakamsha chart, influencing the individual's spiritual journey and life purpose.
            </p>
            <p className="mb-4">
              For example, if your Atmakaraka planet is Jupiter, the Karakamsha chart will reflect Jupiter's influence on your spiritual growth, wisdom, and pursuit of higher knowledge.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Using the Atmakaraka Calculator for Self-Discovery</h2>
          <div className="prose prose-sky max-w-none text-gray-600">
            <p className="mb-4">
              The Atmakaraka calculator is not just a tool for astrologers; it can also be used by individuals for self-discovery and personal growth. Here's how:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Self-Reflection:</strong> By understanding your Atmakaraka influences, you can reflect on your life purpose and spiritual goals.</li>
              <li><strong>Spiritual Alignment:</strong> Knowing your Atmakaraka status can help you align with your soul's desires and take appropriate action.</li>
              <li><strong>Life Planning:</strong> The insights provided by the Atmakaraka calculator can guide you in making informed decisions about your career, relationships, and personal development.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Conclusion</h2>
          <div className="prose prose-sky max-w-none text-gray-600">
            <p className="mb-4">
              The Atmakaraka calculator is an invaluable tool for anyone interested in Vedic astrology and spiritual growth. It simplifies the process of identifying the Atmakaraka planet and provides deep insights into the soul's journey. Whether you are an astrologer or someone seeking to understand your life purpose, the power of the Atmakaraka calculator will help you embark on a journey of self-discovery and spiritual growth today.
            </p>
            <p>
              By using the Atmakaraka calculator, you can gain a deeper understanding of your karmic lessons, spiritual path, and life purpose. So, explore the power of the Atmakaraka calculator and embark on a journey of self-discovery and spiritual growth today.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AtmakarakaCalculator;