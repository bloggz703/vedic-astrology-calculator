import React from 'react';
import Navigation from '../components/Navigation';

function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-sky-900 text-center mb-12">Terms of Service</h1>

        <div className="max-w-3xl mx-auto prose prose-sky">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Agreement to Terms</h2>
            <p className="text-sky-600">
              By accessing and using Vedic Calculators, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Use License</h2>
            <p className="text-sky-600 mb-4">Permission is granted to temporarily access our services for personal, non-commercial use. This license does not include:</p>
            <ul className="list-disc list-inside text-sky-600">
              <li>Modifying or copying our materials</li>
              <li>Using materials for commercial purposes</li>
              <li>Attempting to decompile or reverse engineer any software</li>
              <li>Removing any copyright or proprietary notations</li>
              <li>Transferring the materials to another person</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Disclaimer</h2>
            <p className="text-sky-600 mb-4">
              Our services are provided "as is". We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation:
            </p>
            <ul className="list-disc list-inside text-sky-600">
              <li>Merchantability</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement of intellectual property</li>
              <li>Accuracy of results</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Limitations</h2>
            <p className="text-sky-600">
              In no event shall Vedic Calculators or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Accuracy of Materials</h2>
            <p className="text-sky-600">
              The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials are accurate, complete, or current. We may make changes to the materials at any time without notice.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Links</h2>
            <p className="text-sky-600">
              We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Modifications</h2>
            <p className="text-sky-600">
              We may revise these terms of service at any time without notice. By using our services, you agree to be bound by the current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-sky-900 mb-6">Governing Law</h2>
            <p className="text-sky-600">
              These terms and conditions are governed by and construed in accordance with applicable laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default TermsOfService;