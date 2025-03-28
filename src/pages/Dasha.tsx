import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, MapPin, Star } from 'lucide-react';
import DatePicker from 'react-datepicker';
import LocationSearch from '../components/LocationSearch';
import Navigation from '../components/Navigation';
import { calculateDashaPeriods } from '../utils/dashaCalculations';
import "react-datepicker/dist/react-datepicker.css";

interface Location {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

interface DashaPeriod {
  planet: string;
  startDate: Date;
  endDate: Date;
  interpretation: {
    general: string;
    career: string;
    relationships: string;
    health: string;
  };
}

function DashaCalculator() {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [birthTime, setBirthTime] = useState<Date | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [dashaPeriods, setDashaPeriods] = useState<DashaPeriod[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateDasha = () => {
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

      const periods = calculateDashaPeriods(fullDateTime, location.latitude, location.longitude);
      setDashaPeriods(periods);
    } catch (err) {
      setError('Error calculating Dasha periods. Please check your inputs and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-sky-900 text-center mb-12">Dasha Calculator</h1>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Calculate Your Dasha Periods</h2>
          
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
            onClick={calculateDasha}
            className="mt-8 w-full bg-sky-900 text-white px-6 py-3 rounded-lg hover:bg-sky-800 transition-colors flex items-center justify-center gap-2"
          >
            Calculate Dasha Periods
            <Star className="h-4 w-4" />
          </button>

          {dashaPeriods && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-sky-900 mb-4">Your Dasha Periods</h3>
              <div className="space-y-6">
                {dashaPeriods.map((period, index) => (
                  <div key={index} className="bg-sky-50 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-medium text-sky-900">{period.planet} Dasha</h4>
                        <p className="text-sky-600">
                          {period.startDate.toLocaleDateString()} - {period.endDate.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="bg-sky-100 px-3 py-1 rounded-full">
                        <p className="text-sky-700 text-sm">
                          {Math.round((period.endDate.getTime() - period.startDate.getTime()) / (1000 * 60 * 60 * 24 * 365))} years
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div>
                        <h5 className="font-medium text-sky-800">General Influence</h5>
                        <p className="text-sky-600">{period.interpretation.general}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-sky-800">Career</h5>
                        <p className="text-sky-600">{period.interpretation.career}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-sky-800">Relationships</h5>
                        <p className="text-sky-600">{period.interpretation.relationships}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-sky-800">Health</h5>
                        <p className="text-sky-600">{period.interpretation.health}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <section className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-xl text-sky-600">
            Have you ever wondered why certain phases of your life feel like a breeze while others seem like an uphill battle? As someone deeply immersed in Vedic astrology, I can tell you that the Dasha Calculator is one of the most powerful tools to decode these patterns. Whether you're curious about your career, relationships, or health, understanding your Dasha periods can provide profound insights.
          </p>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Understanding Dasha Calculators</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <h3 className="text-xl font-semibold text-sky-900 mb-4">What is a Dasha Calculator?</h3>
            <p className="mb-4">
              A Dasha Calculator is a tool used in Vedic astrology to determine the planetary periods, or Dashas, that influence your life. These periods are based on the Moon's position in your birth chart and are crucial for making accurate astrological predictions. The Dasha system helps us understand the timing of events and the influence of planets during specific phases of life.
            </p>

            <h3 className="text-xl font-semibold text-sky-900 mb-4">Importance of Dasha Calculations</h3>
            <p className="mb-4">
              Dasha calculations are the backbone of predictive astrology. They reveal the ebb and flow of planetary energies, helping you prepare for challenges and seize opportunities. Whether you're planning a career move or navigating a relationship, knowing your current Dasha can be a game-changer.
            </p>

            <h3 className="text-xl font-semibold text-sky-900 mb-4">Types of Dasha Systems</h3>
            <h4 className="text-lg font-medium text-sky-800 mb-2">Vimshottari Dasha</h4>
            <p className="mb-4">
              The Vimshottari Dasha is the most popular Dasha system in Vedic astrology. It spans 120 years and is divided into periods ruled by the nine planets. Each planet's Dasha period has a unique influence, shaping your experiences and decisions.
            </p>

            <h4 className="text-lg font-medium text-sky-800 mb-2">Yogini Dasha</h4>
            <p className="mb-4">
              The Yogini Dasha is a 36-year cycle that correlates with the Moon's nodes and planetary houses. It's particularly useful for understanding emotional and spiritual growth.
            </p>

            <h4 className="text-lg font-medium text-sky-800 mb-2">Char Dasha</h4>
            <p className="mb-4">
              The Char Dasha, rooted in Jaimini Astrology, focuses on the Ascendant and its relationship with other planets. It's a more specialized system but offers valuable insights when combined with other Dasha systems.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Vimshottari Dasha - The Primary System</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <h3 className="text-xl font-semibold text-sky-900 mb-4">Fundamentals of Vimshottari Dasha</h3>
            <p className="mb-4">
              The Vimshottari Dasha is based on the Moon's placement in your birth chart. It's a 120-year cycle divided into Mahadasha (major periods) and Antardasha (sub-periods). Each planet rules a specific Dasha period, influencing different aspects of your life.
            </p>

            <h3 className="text-xl font-semibold text-sky-900 mb-4">Structure of Vimshottari Dasha</h3>
            <h4 className="text-lg font-medium text-sky-800 mb-2">Mahadasha (Major Period)</h4>
            <p className="mb-4">
              The Mahadasha is the primary period ruled by a planet. For example, the Sun's Mahadasha lasts 6 years and is associated with leadership and self-expression.
            </p>

            <h4 className="text-lg font-medium text-sky-800 mb-2">Antardasha (Sub-period)</h4>
            <p className="mb-4">
              The Antardasha is a sub-period within the Mahadasha. It's ruled by a different planet and modifies the effects of the Mahadasha lord. For instance, during the Sun's Mahadasha, the Moon's Antardasha might bring emotional clarity.
            </p>

            <h4 className="text-lg font-medium text-sky-800 mb-2">Pratyantardasha and Beyond</h4>
            <p className="mb-4">
              Finer divisions like Pratyantardasha, Sookshma Dasha, and Praanadasha provide even more detailed insights. These are especially useful for pinpointing specific events or trends.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Using Dasha Calculators Effectively</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <h3 className="text-xl font-semibold text-sky-900 mb-4">Input Requirements</h3>
            <p className="mb-4">
              To use a Dasha Calculator, you'll need your exact birth details: date, time, and location. Accurate input ensures precise Dasha calculations and reliable results.
            </p>

            <h3 className="text-xl font-semibold text-sky-900 mb-4">Interpreting Dasha Calculator Results</h3>
            <p className="mb-4">
              The Dasha Calculator provides a timeline of your Dasha periods, highlighting the ruling planets and their influences. Focus on the current Dasha and its Antardasha to understand your present circumstances.
            </p>

            <h3 className="text-xl font-semibold text-sky-900 mb-4">Combining Dasha Results with Birth Chart Analysis</h3>
            <p className="mb-4">
              Integrate Dasha predictions with your birth chart for a comprehensive analysis. Consider the Ascendant (Lagna) and planetary aspects to refine your interpretations.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Advanced Concepts in Dasha Calculations</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <h3 className="text-xl font-semibold text-sky-900 mb-4">Impact of Retrograde Planets</h3>
            <p className="mb-4">
              Retrograde planets add complexity to Dasha periods. For example, a retrograde Saturn in your Dasha might delay results but ultimately bring long-term stability.
            </p>

            <h3 className="text-xl font-semibold text-sky-900 mb-4">Dasha Sandhi - Transitional Periods</h3>
            <p className="mb-4">
              Dasha Sandhi refers to the transition between two Dasha periods. These phases can be turbulent but also offer opportunities for growth and transformation.
            </p>

            <h3 className="text-xl font-semibold text-sky-900 mb-4">Dasha Balance at Birth</h3>
            <p className="mb-4">
              The Dasha balance at birth reveals the remaining Dasha period at the time of your birth. It's particularly significant for early life predictions.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Practical Applications of Dasha Predictions</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <h3 className="text-xl font-semibold text-sky-900 mb-4">Career and Professional Life</h3>
            <p className="mb-4">
              Use Dasha periods to identify favorable times for career changes or business ventures. For example, Jupiter's Dasha is ideal for expansion and learning.
            </p>

            <h3 className="text-xl font-semibold text-sky-900 mb-4">Relationships and Personal Life</h3>
            <p className="mb-4">
              Dasha analysis can predict relationship dynamics and timing for major life events like marriage. Venus's Dasha, for instance, is often associated with love and partnerships.
            </p>

            <h3 className="text-xl font-semibold text-sky-900 mb-4">Health and Well-being</h3>
            <p className="mb-4">
              Correlate Dasha periods with potential health issues and plan preventive measures. Saturn's Dasha might require extra attention to physical and mental health.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Complementary Astrological Tools</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <h3 className="text-xl font-semibold text-sky-900 mb-4">Transit Analysis</h3>
            <p className="mb-4">
              Combine Dasha predictions with planetary transits for enhanced accuracy. For example, Jupiter's transit during its Dasha can amplify positive outcomes.
            </p>

            <h3 className="text-xl font-semibold text-sky-900 mb-4">Ashtakavarga System</h3>
            <p className="mb-4">
              The Ashtakavarga system refines Dasha interpretations by evaluating planetary strengths and weaknesses.
            </p>

            <h3 className="text-xl font-semibold text-sky-900 mb-4">Divisional Charts (D-Charts)</h3>
            <p className="mb-4">
              Analyze Dashas in divisional charts like the Navamsa for deeper insights into specific life areas.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Ethical Considerations and Limitations</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <h3 className="text-xl font-semibold text-sky-900 mb-4">Responsible Use of Dasha Predictions</h3>
            <p className="mb-4">
              Use Dasha insights ethically, focusing on guidance rather than deterministic predictions. Encourage free will and personal growth.
            </p>

            <h3 className="text-xl font-semibold text-sky-900 mb-4">Limitations of Dasha Calculators</h3>
            <p className="mb-4">
              While Dasha calculators are powerful, they're not infallible. Human interpretation is essential for nuanced and accurate predictions.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Future of Dasha Calculations</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <h3 className="text-xl font-semibold text-sky-900 mb-4">Technological Advancements</h3>
            <p className="mb-4">
              AI and machine learning are revolutionizing Dasha calculations, offering more personalized and accurate predictions.
            </p>

            <h3 className="text-xl font-semibold text-sky-900 mb-4">Research and Validation</h3>
            <p className="mb-4">
              Ongoing studies aim to validate and refine Dasha prediction techniques, bridging traditional astrology with modern science.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Conclusion</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <p className="mb-4">
              The Dasha Calculator is more than just a tool; it's a roadmap to understanding life's rhythms. By exploring your Dasha periods, you can gain clarity, make informed decisions, and embrace life's challenges with confidence. So, why not give it a try? You might just uncover the cosmic blueprint guiding your journey.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DashaCalculator;