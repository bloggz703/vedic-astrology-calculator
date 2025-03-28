import React from 'react';
import Navigation from '../components/Navigation';

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-sky-900 text-center mb-12">Privacy Policy</h1>

        <div className="max-w-3xl mx-auto prose prose-sky">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Introduction</h2>
            <p className="text-sky-600">
              At Vedic Calculators, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Information We Collect</h2>
            <h3 className="text-xl font-medium text-sky-800 mb-4">Personal Information</h3>
            <p className="text-sky-600 mb-4">We may collect personal information that you voluntarily provide to us when you:</p>
            <ul className="list-disc list-inside text-sky-600 mb-6">
              <li>Use our calculators</li>
              <li>Sign up for our newsletter</li>
              <li>Contact us</li>
              <li>Participate in our surveys or feedback forms</li>
            </ul>

            <h3 className="text-xl font-medium text-sky-800 mb-4">Automatically Collected Information</h3>
            <p className="text-sky-600 mb-4">We may automatically collect certain information when you visit our website, including:</p>
            <ul className="list-disc list-inside text-sky-600">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device type</li>
              <li>Operating system</li>
              <li>Pages visited</li>
              <li>Time and date of visits</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">How We Use Your Information</h2>
            <p className="text-sky-600 mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-sky-600">
              <li>Provide and maintain our services</li>
              <li>Improve user experience</li>
              <li>Analyze usage patterns</li>
              <li>Send newsletters and updates (with your consent)</li>
              <li>Respond to your inquiries</li>
              <li>Prevent fraud and abuse</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Information Sharing</h2>
            <p className="text-sky-600 mb-4">We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except:</p>
            <ul className="list-disc list-inside text-sky-600">
              <li>To comply with legal obligations</li>
              <li>To protect our rights and property</li>
              <li>In the event of a business transfer or merger</li>
              <li>With service providers who assist in our operations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Data Security</h2>
            <p className="text-sky-600">
              We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Your Rights</h2>
            <p className="text-sky-600 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-sky-600">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Withdraw consent</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Changes to This Policy</h2>
            <p className="text-sky-600">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Contact Us</h2>
            <p className="text-sky-600">
              If you have any questions about this Privacy Policy, please contact us at privacy@vediccalculators.com.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default PrivacyPolicy;