import React, { useState } from 'react';
import { ArrowLeft, Star, Calendar, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import LocationSearch from '../components/LocationSearch';
import Navigation from '../components/Navigation';
import { calculateUpapadaLagna } from '../utils/upapadaCalculations';
import "react-datepicker/dist/react-datepicker.css";

interface Location {
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

interface CalculationResult {
  upapadaSign: string;
  lordOfUpapada: string;
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

function UpapadaLagnaCalculator() {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [birthTime, setBirthTime] = useState<Date | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [result, setResult] = useState<CalculationResult | null>(null);
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

      const result = calculateUpapadaLagna(fullDateTime, location.latitude, location.longitude);
      setResult(result);
    } catch (err) {
      setError('Error calculating Upapada Lagna. Please check your inputs and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-sky-900 text-center mb-12">Upapada Lagna Calculator</h1>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Calculate Your Upapada Lagna</h2>
          <p className="text-sky-600 mb-8">Enter your birth details to analyze your marriage and relationship patterns.</p>

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
            Calculate Upapada Lagna
            <Star className="h-4 w-4" />
          </button>

          {result && (
            <div className="mt-8 p-6 bg-sky-50 rounded-lg">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-sky-900 mb-2">Your Upapada Lagna</h3>
                <p className="text-3xl font-bold text-sky-700 mb-2">{result.upapadaSign}</p>
                <p className="text-lg text-sky-600">
                  Lord of Upapada: {result.lordOfUpapada}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-sky-900 mb-3">Planetary Aspects:</h4>
                <div className="grid gap-4">
                  {result.aspects.map((aspect, index) => (
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
                  <p className="text-sky-600">{result.interpretation.general}</p>
                  <p className="text-sky-700">{result.interpretation.timing}</p>
                  <p className="text-sky-800 font-medium">{result.interpretation.recommendation}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-4">How Does an Upapada Lagna Calculator Work?</h2>
          <p className="text-sky-600 mb-6">
            An Upapada Lagna calculator operates based on precise astrological calculations. Here's a step-by-step breakdown of how it works:
          </p>
          <ol className="list-decimal list-inside space-y-4 text-sky-600">
            <li>
              <span className="font-medium">Input Birth Details:</span> You enter your birth date, exact birth time, and birth location into the calculator.
            </li>
            <li>
              <span className="font-medium">Determine the Arudha Lagna:</span> The tool calculates the Arudha Lagna based on the position of the ascendant and other planetary placements in the birth chart.
            </li>
            <li>
              <span className="font-medium">Calculate the Upapada Lagna:</span> The calculator identifies the 12th house from the Arudha Lagna to determine the Upapada Lagna.
            </li>
            <li>
              <span className="font-medium">Generate Results:</span> The calculator displays the Upapada Lagna and its lord, along with insights into its influence on marriage and relationships.
            </li>
          </ol>
          <p className="text-sky-600 mt-4">
            For example, if your Upapada Lagna is in Leo, it may indicate a spouse who is confident, charismatic, and leadership-oriented. The Upapada Lagna lord (in this case, the Sun) will further influence the nature of the relationship.
          </p>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Upapada Lagna Calculator: Unlocking the Secrets of Marriage and Relationships in Vedic Astrology</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <p className="mb-4">
              In Vedic astrology, the Upapada Lagna holds a special place when it comes to understanding marriage, partnerships, and relationships. Often referred to as the "significator of marriage," the Upapada Lagna provides deep insights into the nature of one's spouse, the quality of marital life, and the timing of marriage. Calculating the Upapada Lagna manually can be a complex process, requiring precise astrological knowledge and intricate calculations. This is where an Upapada Lagna calculator becomes an invaluable tool. In this article, we will explore the significance of the Upapada Lagna, how an Upapada Lagna calculator works, and how it can help you gain clarity about your marital destiny.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">What is Upapada Lagna?</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <p className="mb-4">
              The Upapada Lagna is a special point in the birth chart that is used to analyze marriage and partnerships. It is derived from the 12th house from the Arudha Lagna (AL), which represents the image or perception of the self. The Upapada Lagna is also closely connected to the Navamsa chart, a divisional chart that provides deeper insights into marriage and spirituality.
            </p>
            <p className="mb-4">
              The term Upapada is derived from the Sanskrit words "upa" (near) and "pada" (foot), symbolizing the foundation of marriage. The Upapada Lagna is considered the "doorway" to understanding one's marital life, including the nature of the spouse, the timing of marriage, and the overall quality of the relationship.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">The Role of the Upapada Lagna Calculator</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <p className="mb-4">
              An Upapada Lagna calculator is an online tool designed to simplify the process of determining the Upapada Lagna in a birth chart. By inputting the individual's birth details—such as date, time, and place of birth—the calculator uses astrological algorithms to identify the Upapada Lagna and its lord. This tool is especially helpful for those who are new to Vedic astrology or do not have access to an astrologer.
            </p>
            <p className="mb-4">
              Many Upapada Lagna calculators are available for free online, making it easy for anyone to discover their Upapada Lagna. Some advanced tools also provide additional insights, such as the placement of the Upapada Lagna lord and its influence on the individual's marital life.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Significance of the Upapada Lagna</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <p className="mb-4">The Upapada Lagna plays a crucial role in shaping one's marital life. Here are some key reasons why understanding the Upapada Lagna is essential:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Nature of the Spouse:</strong> The Upapada Lagna provides insights into the personality, appearance, and qualities of the spouse. For instance, a Cancer Upapada Lagna may indicate a nurturing and emotionally sensitive partner.</li>
              <li><strong>Timing of Marriage:</strong> The Upapada Lagna and its lord can help predict the timing of marriage. Transits and planetary periods (dashas) related to the Upapada Lagna are often significant in determining when marriage is likely to occur.</li>
              <li><strong>Quality of Marital Life:</strong> The placement and condition of the Upapada Lagna and its lord reveal the overall quality of the marital relationship, including potential challenges and strengths.</li>
              <li><strong>Karmic Connections:</strong> The Upapada Lagna is also linked to karmic relationships, indicating whether the marriage is destined to fulfill past-life connections.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Exploring the Upapada Lagna Lord</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <p className="mb-4">
              The Upapada Lagna lord is the planet that rules the sign in which the Upapada Lagna is placed. This planet plays a significant role in shaping the marital experience. Here's how the Upapada Lagna lord influences the relationship:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Positive Influence:</strong> A well-placed and strong Upapada Lagna lord can indicate a harmonious and fulfilling marriage.</li>
              <li><strong>Negative Influence:</strong> A weak or afflicted Upapada Lagna lord may suggest challenges in the marital relationship, such as delays in marriage or conflicts with the spouse.</li>
              <li><strong>Transits and Dashas:</strong> The Upapada Lagna lord becomes particularly significant during its planetary period (dasha) or when transiting key points in the birth chart.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Using an Upapada Lagna Calculator for Self-Discovery</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <p className="mb-4">
              An Upapada Lagna calculator is more than just a tool for astrologers; it's a powerful resource for anyone interested in understanding their marital destiny. Here's how you can use it to gain deeper insights into your life:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Understand Your Spouse:</strong> By knowing your Upapada Lagna, you can gain insights into the nature and qualities of your future spouse.</li>
              <li><strong>Plan for Marriage:</strong> The calculator can help you identify favorable periods for marriage based on the Upapada Lagna and its lord.</li>
              <li><strong>Address Challenges:</strong> If the Upapada Lagna or its lord is afflicted, you can take proactive steps to mitigate potential challenges in your marital life.</li>
              <li><strong>Explore Karmic Connections:</strong> The Upapada Lagna can provide clues about past-life connections and the karmic purpose of your marriage.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Common Misconceptions About the Upapada Lagna</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <p className="mb-4">Despite its importance, the Upapada Lagna is often misunderstood. Here are some common misconceptions and the truth behind them:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>It's Only Relevant for Marriage:</strong> While the Upapada Lagna is primarily used to analyze marriage, it can also provide insights into other partnerships and relationships.</li>
              <li><strong>A Weak Upapada Lagna Means No Marriage:</strong> A weak or afflicted Upapada Lagna does not necessarily mean you won't get married. It simply indicates potential challenges that may require attention.</li>
              <li><strong>It's Superstitious:</strong> The Upapada Lagna is based on the principles of Vedic astrology, which is a scientific and time-tested system.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Other Useful Astrological Concepts</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <p className="mb-4">In addition to the Upapada Lagna, there are other related concepts that can enhance your understanding of marriage and relationships:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Arudha Pada:</strong> This represents the image or perception of a specific house in the birth chart. The Arudha Pada of the 7th house (marriage) is particularly significant.</li>
              <li><strong>Navamsa Chart:</strong> This divisional chart provides deeper insights into marriage, spirituality, and the soul's purpose.</li>
              <li><strong>Atmakaraka:</strong> The planet with the highest degree in the birth chart, representing the soul's purpose and karmic lessons.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Conclusion</h2>
          <div className="prose prose-sky max-w-none text-sky-600">
            <p className="mb-4">
              The Upapada Lagna is a powerful tool in Vedic astrology for understanding marriage, partnerships, and relationships. An Upapada Lagna calculator simplifies the process of determining this crucial point in the birth chart, making it accessible to everyone. Whether you're planning for marriage, seeking insights into your spouse, or exploring the karmic purpose of your relationships, the Upapada Lagna can provide profound clarity.
            </p>
            <p>
              For complete relationship insights, combine this analysis with a <Link to="/kundli-milan" className="text-sky-700 hover:text-sky-800">Kundli Milan analysis</Link> or a quick <Link to="/name-compatibility" className="text-sky-700 hover:text-sky-800">Name Compatibility</Link> check. Together, these tools provide a holistic view of your relationship dynamics and potential.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">What is Upapada Lagna in Vedic astrology?</summary>
              <p className="mt-4 text-sky-600">
                The Upapada Lagna is a special point in the birth chart that is used to analyze marriage and partnerships. It is calculated from the Arudha Lagna (AL), which represents the image or projection of the self.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">How is Upapada Lagna different from the 7th house?</summary>
              <p className="mt-4 text-sky-600">
                While the 7th house represents partnerships and marriage in general, the Upapada Lagna specifically deals with the quality and nature of marriage. It provides more detailed insights into marital life.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">Can Upapada Lagna predict when I will get married?</summary>
              <p className="mt-4 text-sky-600">
                The Upapada Lagna, along with its lord and aspects, can provide timing indications for marriage. However, it should be analyzed in conjunction with other factors in the birth chart.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">What if my Upapada Lagna is afflicted?</summary>
              <p className="mt-4 text-sky-600">
                An afflicted Upapada Lagna might indicate challenges in relationships. However, remedial measures and awareness can help overcome these challenges.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="text-sky-900 font-medium cursor-pointer">How accurate is this Upapada Lagna calculator?</summary>
              <p className="mt-4 text-sky-600">
                The calculator uses precise astronomical calculations based on your birth details. The accuracy depends on the precision of your birth time and location information.
              </p>
            </details>
          </div>
        </section>

        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-sky-900 mb-6">Explore Related Relationship Calculators</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/kundli-milan" className="calculator-link">
              <div className="flex items-center gap-3 justify-center">
                <Star className="h-5 w-5 text-sky-700" />
                <span>Kundli Milan Calculator</span>
              </div>
              <p className="text-sm text-sky-600 mt-2">
                Traditional Vedic compatibility analysis based on birth charts
              </p>
            </Link>
            <Link to="/name-compatibility" className="calculator-link">
              <div className="flex items-center gap-3 justify-center">
                <Star className="h-5 w-5 text-sky-700" />
                <span>Name Compatibility Calculator</span>
              </div>
              <p className="text-sm text-sky-600 mt-2">
                Check compatibility analysis based on names
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UpapadaLagnaCalculator;