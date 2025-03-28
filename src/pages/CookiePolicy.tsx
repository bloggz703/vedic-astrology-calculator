import React from 'react';
import Navigation from '../components/Navigation';

function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-sky-900 text-center mb-12">Cookie Policy</h1>

        <div className="max-w-3xl mx-auto prose prose-sky">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">What Are Cookies</h2>
            <p className="text-sky-600">
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide information to the website owners.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">How We Use Cookies</h2>
            <p className="text-sky-600 mb-4">We use cookies for the following purposes:</p>
            <ul className="list-disc list-inside text-sky-600">
              <li>To provide essential website functionality</li>
              <li>To remember your preferences</li>
              <li>To analyze how you use our website</li>
              <li>To improve our services</li>
              <li>To personalize your experience</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-medium text-sky-800 mb-4">Essential Cookies</h3>
            <p className="text-sky-600 mb-6">
              These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
            </p>

            <h3 className="text-xl font-medium text-sky-800 mb-4">Performance Cookies</h3>
            <p className="text-sky-600 mb-6">
              These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
            </p>

            <h3 className="text-xl font-medium text-sky-800 mb-4">Functionality Cookies</h3>
            <p className="text-sky-600 mb-6">
              These cookies enable the website to provide enhanced functionality and personalization based on your preferences.
            </p>

            <h3 className="text-xl font-medium text-sky-800 mb-4">Targeting Cookies</h3>
            <p className="text-sky-600">
              These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant advertisements.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Managing Cookies</h2>
            <p className="text-sky-600 mb-4">
              Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience.
            </p>
            <p className="text-sky-600">
              To learn more about cookies and how to manage them, visit <a href="https://www.aboutcookies.org" className="text-sky-700 hover:text-sky-800">www.aboutcookies.org</a>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Third-Party Cookies</h2>
            <p className="text-sky-600">
              In some special cases, we also use cookies provided by trusted third parties. These third-party cookies help us understand how you use our website and how we can improve our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Changes to This Policy</h2>
            <p className="text-sky-600">
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Contact Us</h2>
            <p className="text-sky-600">
              If you have any questions about our Cookie Policy, please contact us at privacy@vediccalculators.com.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default CookiePolicy;