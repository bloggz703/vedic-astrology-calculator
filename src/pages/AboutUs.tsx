import React from 'react';
import Navigation from '../components/Navigation';
import { Users, Star, BookOpen, Heart } from 'lucide-react';

function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-sky-900 text-center mb-12">About Us</h1>

        <div className="max-w-3xl mx-auto">
          <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Our Story</h2>
            <p className="text-sky-600 mb-6">
              Vedic Calculators was founded by a team of passionate astrology enthusiasts who wanted to make the ancient wisdom of Vedic astrology accessible to everyone. With backgrounds in both traditional astrology and modern technology, our team bridges the gap between these two worlds.
            </p>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Our Mission</h2>
            <p className="text-sky-600 mb-6">
              Our mission is to demystify Vedic astrology by providing accurate, easy-to-use calculators and educational resources. We believe that understanding your cosmic blueprint can provide valuable insights for personal growth and self-awareness.
            </p>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Our Team</h2>
            <p className="text-sky-600 mb-6">Our team consists of:</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-sky-50 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="h-6 w-6 text-sky-700" />
                  <h3 className="text-lg font-medium text-sky-900">Astrologers</h3>
                </div>
                <p className="text-sky-600">With decades of experience in Vedic astrology</p>
              </div>
              <div className="p-6 bg-sky-50 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-sky-700" />
                  <h3 className="text-lg font-medium text-sky-900">Developers</h3>
                </div>
                <p className="text-sky-600">Skilled in creating intuitive digital tools</p>
              </div>
              <div className="p-6 bg-sky-50 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-6 w-6 text-sky-700" />
                  <h3 className="text-lg font-medium text-sky-900">Researchers</h3>
                </div>
                <p className="text-sky-600">Who ensure the accuracy of our calculations</p>
              </div>
              <div className="p-6 bg-sky-50 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="h-6 w-6 text-sky-700" />
                  <h3 className="text-lg font-medium text-sky-900">Content Creators</h3>
                </div>
                <p className="text-sky-600">Who make complex astrological concepts understandable</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Our Approach</h2>
            <p className="text-sky-600 mb-6">
              We are committed to honoring the ancient traditions of Vedic astrology while making them relevant for the modern world. Our calculators use time-tested formulas and methodologies, presented through a user-friendly interface.
            </p>
            <p className="text-sky-600 mb-6">
              We understand that astrology is both a science and an art, requiring both precise calculations and intuitive interpretation. Our tools provide the technical foundation, while our educational content helps you develop the interpretive skills.
            </p>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Our Values</h2>
            <p className="text-sky-600 mb-4">We are guided by the following values:</p>
            <div className="space-y-4">
              <div className="p-4 bg-sky-50 rounded-lg">
                <h3 className="font-medium text-sky-900 mb-2">Authenticity</h3>
                <p className="text-sky-600">Staying true to the principles of Vedic astrology</p>
              </div>
              <div className="p-4 bg-sky-50 rounded-lg">
                <h3 className="font-medium text-sky-900 mb-2">Accessibility</h3>
                <p className="text-sky-600">Making astrological knowledge available to everyone</p>
              </div>
              <div className="p-4 bg-sky-50 rounded-lg">
                <h3 className="font-medium text-sky-900 mb-2">Accuracy</h3>
                <p className="text-sky-600">Ensuring our calculations and information are precise</p>
              </div>
              <div className="p-4 bg-sky-50 rounded-lg">
                <h3 className="font-medium text-sky-900 mb-2">Respect</h3>
                <p className="text-sky-600">Honoring the cultural origins and spiritual dimensions of astrology</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Join Us</h2>
            <p className="text-sky-600 mb-6">
              Whether you're a beginner curious about astrology or an experienced practitioner, we invite you to explore our tools and resources. If you have questions or feedback, please don't hesitate to contact us.
            </p>
            <div className="flex justify-center">
              <a
                href="/contact-us"
                className="inline-flex items-center gap-2 bg-sky-900 text-white px-6 py-3 rounded-lg hover:bg-sky-800 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AboutUs;