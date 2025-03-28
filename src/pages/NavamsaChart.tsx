import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, MapPin, Star } from 'lucide-react';
import DatePicker from 'react-datepicker';
import LocationSearch from '../components/LocationSearch';
import Navigation from '../components/Navigation';
import { calculateNavamsa } from '../utils/navamsaCalculations';
import "react-datepicker/dist/react-datepicker.css";

interface Location {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

interface CalculationResult {
  navamsaSign: string;
  lordOfNavamsa: string;
  aspects: {
    planet: string;
    aspect: string;
    influence: string;
  }[];
  interpretation: {
    general: string;
    timing: string;
    recommendation: string;
  };
}

function NavamsaChartCalculator() {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [birthTime, setBirthTime] = useState<Date | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateChart = () => {
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

      const result = calculateNavamsa(fullDateTime, location.latitude, location.longitude);
      setCalculationResult(result);
    } catch (err) {
      setError('Error calculating Navamsa chart. Please check your inputs and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-sky-900 text-center mb-12">Navamsa Chart Calculator</h1>

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
            onClick={calculateChart}
            className="mt-8 w-full bg-sky-900 text-white px-6 py-3 rounded-lg hover:bg-sky-800 transition-colors flex items-center justify-center gap-2"
          >
            Calculate Navamsa Chart
            <Star className="h-4 w-4" />
          </button>

          {calculationResult && (
            <div className="mt-8 p-6 bg-sky-50 rounded-lg">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-sky-900 mb-2">Your Navamsa Chart</h3>
                <p className="text-3xl font-bold text-sky-700 mb-2">{calculationResult.navamsaSign}</p>
                <p className="text-lg text-sky-600">
                  Lord of Navamsa: {calculationResult.lordOfNavamsa}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-sky-900 mb-3">Planetary Aspects:</h4>
                <div className="grid gap-4">
                  {calculationResult.aspects.map((aspect, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg">
                      <p className="text-sky-600 font-medium">{aspect.planet}</p>
                      <p className="text-sky-700">{aspect.aspect}</p>
                      <p className="text-sm text-sky-600 mt-2">{aspect.influence}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-sky-200 pt-4">
                <h4 className="font-medium text-sky-900 mb-3">Interpretation:</h4>
                <div className="space-y-4">
                  <p className="text-sky-600">{calculationResult.interpretation.general}</p>
                  <p className="text-sky-700">{calculationResult.interpretation.timing}</p>
                  <p className="text-sky-800 font-medium">{calculationResult.interpretation.recommendation}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-4">What is a Navamsa Chart?</h2>
          <p className="text-sky-600 mb-4">
            The Navamsa chart (D9 chart) is one of the most important divisional charts in Vedic astrology. It divides each sign into nine equal parts, providing insights into marriage, spirituality, and hidden strengths.
          </p>
          <p className="text-sky-600">
            Use our calculator above to generate your personalized Navamsa chart based on your birth details. The results will show your planetary positions, Navamsa ascendant, and provide interpretations.
          </p>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Understanding the Navamsa Chart Calculator: A Comprehensive Guide</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <p className="mb-4">
              In Vedic astrology, the Navamsa chart, also known as the D9 chart, holds immense significance. It is one of the most important charts used to gain deeper insights into an individual's life, particularly in areas like marriage, spirituality, and destiny. The Navamsa chart calculator is an essential tool for astrologers and enthusiasts alike, as it simplifies the complex process of creating and interpreting this chart. In this article, we will explore the Navamsa chart, its importance, and how a Navamsa chart calculator can enhance your astrological practice.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">What is a Navamsa Chart?</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <p className="mb-4">
              The Navamsa chart is a supplementary chart derived from the birth chart (also known as the Rashi chart). It is created by dividing each sign (rashi) into nine equal parts, known as navamsas. Each navamsa represents 3 degrees and 20 minutes of a sign. The term "Navamsa" is derived from the Sanskrit words "nava" (nine) and "amsa" (division), meaning "nine divisions."
            </p>
            <p className="mb-4">
              The Navamsa chart serves as a magnifying glass, providing a detailed view of specific areas of life that are not easily visible in the birth chart. It is particularly useful for analyzing marriage, partnerships, and spiritual growth. The chart serves as a complementary tool to the birth chart, offering deeper insights into the bhava (house) significations and planetary strengths.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Importance of the Navamsa Chart</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <p className="mb-4">
              The Navamsa chart is often referred to as the "fruit of the tree," where the birth chart represents the tree itself. It reveals the outcomes of the planetary placements in the birth chart and highlights the areas of life that will bear fruit. Here are some key reasons why the Navamsa chart is considered one of the important charts in Vedic astrology:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Marriage and Partnerships:</strong> The Navamsa chart is primarily used to analyze marriage, marital happiness, and the nature of relationships.</li>
              <li><strong>Spiritual Growth:</strong> The Navamsa chart reveals an individual's spiritual inclinations and potential for growth.</li>
              <li><strong>Planetary Strength:</strong> Planets in the Navamsa chart are assessed for their strength.</li>
              <li><strong>Destiny and Life Path:</strong> The Navamsa chart provides clues about destiny and life lessons.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Types of Navamsa Charts</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <p className="mb-4">There are different types of Navamsa charts used in Vedic astrology, each serving a specific purpose. Some of the notable ones include:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Indian Style Navamsa:</strong> The most commonly used format, following traditional methods.</li>
              <li><strong>Khara Navamsa:</strong> Used to analyze planetary strength and nature.</li>
              <li><strong>Tulya Navamsa:</strong> Used for comparing charts in marriage compatibility.</li>
              <li><strong>Pushkara Navamsa:</strong> Associated with auspiciousness and benefits.</li>
              <li><strong>Vargottama Navamsas:</strong> Indicates enhanced strength and positive outcomes.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Key Divisions in the Navamsa Chart</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <p className="mb-4">The Navamsa chart is divided into several key sections, each with its own significance:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>First Navamsa:</strong> Represents the self, personality, and physical body.</li>
              <li><strong>Fifth Navamsa:</strong> Associated with creativity, children, and romance.</li>
              <li><strong>Ninth Navamsa:</strong> Linked to spirituality, higher education, and fortune.</li>
              <li><strong>64th Navamsa:</strong> Provides insights into hidden talents and karmic patterns.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Enhancing Your Astrological Practice</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <p className="mb-4">
              A Navamsa chart calculator not only simplifies the process of creating the Navamsa chart but also enhances its interpretation. Here are some ways it can aid your astrological practice:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Accuracy:</strong> The calculator ensures precise calculations.</li>
              <li><strong>Time-Saving:</strong> Generates charts instantly instead of hours of manual work.</li>
              <li><strong>Ease of Use:</strong> Accessible even for beginners in Vedic astrology.</li>
              <li><strong>Supplementary Tools:</strong> Often includes additional features and calculators.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">The Role of Navamsa Charts in Divisional Charts</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <p className="mb-4">
              The Navamsa chart is one of the sixteen divisional charts (Shodashvarga) used in Vedic astrology. These charts provide a detailed analysis of specific areas of life. The Navamsa chart is considered the most important among these divisional charts due to its ability to reveal hidden aspects of an individual's life.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Conclusion</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <p className="mb-4">
              The Navamsa chart is a powerful tool in Vedic astrology, offering deep insights into marriage, spirituality, and destiny. With the help of a Navamsa chart calculator, creating and interpreting this chart type has become more accessible than ever. Whether you are an experienced astrologer or a beginner, incorporating the Navamsa chart into your practice can significantly enhance your understanding of an individual's life path.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">What does the Navamsa chart reveal about marriage?</summary>
              <p className="mt-4 text-sky-600">
                The Navamsa chart provides insights into marital life, including the nature of your spouse, timing of marriage, and quality of the relationship. It's particularly useful for understanding the deeper aspects of partnerships.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">What is a Vargottama position?</summary>
              <p className="mt-4 text-sky-600">
                A Vargottama position occurs when a planet occupies the same sign in both the birth chart and Navamsa chart. This is considered highly auspicious and strengthens the planet's significations.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">How does the Navamsa chart differ from the birth chart?</summary>
              <p className="mt-4 text-sky-600">
                While the birth chart shows your basic nature and life circumstances, the Navamsa chart reveals the fruits of your karma and deeper spiritual aspects. It's like a magnifying glass that shows details not visible in the birth chart.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">How accurate is this Navamsa calculator?</summary>
              <p className="mt-4 text-sky-600">
                Our calculator uses precise astronomical calculations based on your birth details. The accuracy depends on the precision of your birth time and location information.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">What is the significance of the Navamsa chart's strength score?</summary>
              <p className="mt-4 text-sky-600">
                The strength score indicates how effectively the planets in your Navamsa chart can manifest their significations. A higher score suggests better results in areas like marriage and spiritual growth.
              </p>
            </details>
          </div>
        </section>
      </main>
    </div>
  );
}

export default NavamsaChartCalculator;